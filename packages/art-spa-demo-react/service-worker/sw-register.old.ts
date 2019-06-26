// import { Workbox } from 'workbox-window';
import artConfig from '../art.config.js';

const enableServiceWorker = artConfig.sw.enable;
// 当资源发生变化时，为了防止旧缓存资源被继续使用，从而造成隐患
// 有update和delete两种处理旧资源的方式可选，设置为false则使用delete方式
const isUpdateResource = artConfig.sw.isUpdateRuntimeCache;

export default function handleServiceWorker() {
  if (enableServiceWorker) {
    if ('serviceWorker' in navigator) {
      if (process.env.NODE_ENV === 'production') {
        registerServiceWorker();
      }
    } else {
      // TODO 统计不兼容service worker的浏览器数据(navigator.userAgent)
    }
  } else {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      });
    }
  }
}

async function registerServiceWorker() {
  // @ts-ignore
  const { Workbox } = await import(/* webpackChunkName: 'workbox-window' */'workbox-window');
  const workbox = new Workbox('./service-worker.js');

  workbox.addEventListener('installed', (event) => {
    console.log('installed', Date.now());
    // bus.$emit('sw-need-update');
    // addMessageEventListenerToFetchResource();
  });

  workbox.addEventListener('waiting', (event) => {
    console.log(`A new service worker has installed, but it can't activate` +
      `until all tabs running the current version have fully unloaded.`, Date.now());
  });

  workbox.addEventListener('controlling', (event) => {
    console.log('controlling', Date.now());
  });

  workbox.addEventListener('activated', (event) => {
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (event.isUpdate) {
      // TODO 统计资源更新(耗时、时间点、用户或设备标识)
      console.log('New content is available; please refresh.', Date.now());
      handleSWRuntimeCache();
    } else {
      // TODO 统计资源首次加载(耗时、时间点、用户或设备标识)
      console.log('Content has been cached for offline use.', Date.now());
    }
  });

  // workbox.addEventListener('externalinstalled', (event) => { });
  // workbox.addEventListener('externalwaiting', (event) => { });
  // workbox.addEventListener('externalactivated', (event) => { });

  workbox.register();
}

function handleSWRuntimeCache() {
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.map((cacheName) => {
        // 先清除cache storage中的资源，防止旧缓存资源造成隐患(排除已经在install阶段更新的资源和不经常更新的第三方资源以及使用networkFirst策略的api响应数据)
        // 再根据indexedDB中已缓存的资源信息重新加载资源或清除indexedDB中的资源信息
        const excludeRuntimeCacheNames = ['third-party-assets-runtime-cache', 'api-response-runtime-cache'];
        if (cacheName.indexOf('install-time-precache') === -1 && excludeRuntimeCacheNames.indexOf(cacheName) === -1) {
          return caches.delete(cacheName).then(() => {
            // workbox创建的数据库名和缓存仓库名一致
            const databaseName = cacheName;
            // 删除cache storage之后，继续操作indexedDB中的数据
            openIDBDatabase(databaseName).then((evt: any) => {
              if (!evt.target) { return; }
              const db: IDBDatabase = evt.target.result;
              // workbox创建的数据库名和对象仓库名一致
              const objectStoreName = db.name;
              // 判断IDBDatabase中是否存在objectStore对象
              // 不存在则说明该数据库有异常，可能是由于资源加载异常导致，删除该数据库(下次资源加载成功会自动重新创建)
              if (!db.objectStoreNames.contains(objectStoreName)) {
                deleteIDBDatabase(db);
                return;
              }
              try {
                // 如果object store不存在，执行transaction方法会报错，所以要做异常处理
                const transaction = db.transaction(objectStoreName, 'readwrite');
                const objectStore = transaction.objectStore(objectStoreName);
                if (isUpdateResource) {
                  updateCachedResource(db, objectStore);
                } else {
                  deleteIDBDatabase(db);
                }
              } catch (error) {
                console.log(error);
              }
            });
          });
        }
        return;
      })
    );
  });
}

// 打开indexedDB database，database不存在时会自动创建一个新的
async function openIDBDatabase(databaseName: string) {
  const promise = await new Promise((resolve, reject) => {
    const openedRequest = indexedDB.open(databaseName, 2);
    openedRequest.onerror = (event: any) => { reject(event.target.error); };
    openedRequest.onsuccess = (event) => { resolve(event); };
  });
  return promise;
}

// 删除indexedDB database
async function deleteIDBDatabase(database: IDBDatabase) {
  const promise = await new Promise((resolve, reject) => {
    database.close(); // 删除database之前必须先关闭连接，否则无法正常删除
    const request = indexedDB.deleteDatabase(database.name);
    request.onerror = (event: any) => { reject(event.target.error); };
    request.onsuccess = () => {
      console.log(`The IDBDatabase(${database.name}) has been deleted.`);
      resolve();
    };
  });
  return promise;
}

// 根据indexedDB中的对象仓库，获取其中所有缓存过的资源的信息
async function getAllCachedResource(objectStore: IDBObjectStore) {
  const cachedResource = await new Promise((resolve, reject) => {
    if ('getAll' in IDBObjectStore.prototype) {
      const request = objectStore.getAll();
      request.onerror = (event: any) => { reject(event.target.error); };
      request.onsuccess = (event: any) => {
        const result: any[] = event.target.result || [];
        resolve(result);
      };
    } else {
      const result: any[] = [];
      const request = objectStore.openCursor();
      request.onerror = (event: any) => { reject(event.target.error); };
      request.onsuccess = (event: any) => {
        const cursor = event.target.result;
        if (cursor) {
          result.push(cursor.value);
          cursor.continue(); // 继续下一个游标，相当于将onsuccess函数再执行一次
        } else {
          resolve(result);
        }
      };
    }
  });
  return cachedResource;
}

let allCachedResourceCount = 0; // 总共需要加载的资源个数
let fetchedResourceCount = 0; // 已经加载完成的资源个数

// 更新缓存的(runtime cache)资源
function updateCachedResource(database: IDBDatabase, objectStore: IDBObjectStore) {
  getAllCachedResource(objectStore)
    .then((allCachedResource: any) => {
      // 更新资源之前先删除原数据库，然后利用fetch重新创建数据库，fetch失败的资源不会被重新存储
      deleteIDBDatabase(database).then(() => {
        allCachedResourceCount += allCachedResource.length; // 更新总共需要加载的资源个数
        allCachedResource.forEach((resource) => {
          // 使用no-cors模式，防止跨域资源报错
          // 由于Stale-While-Revalidate策略和Network-First策略可以缓存response-type为opaque的资源，所以可以使用no-cors模式，否则不应该使用该模式
          fetch(resource.url, { mode: 'no-cors' })
            .then((response) => {
              if (response.status === 404) {
                console.log(`${resource.url} resource is not found, using cached resource.`);
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              // 判断资源是否已经全部加载完成，完成时更新页面提示信息
              fetchedResourceCount += 1; // 更新已经加载完成资源的个数
              if (fetchedResourceCount === allCachedResourceCount) {
                setTimeout(() => {
                  // 为了防止fetch事件完成速度比message事件传递速度更快而导致后面传递过来的message数据来不及统计
                  // 所以加了这个延时判断做二次确认，确保所有的message数据都被使用到，同时延长加载进度条的显示时间
                  if (fetchedResourceCount === allCachedResourceCount) {
                    // bus.$emit('sw-fetch-all-resource-end');
                    allCachedResourceCount = 0;
                    fetchedResourceCount = 0;
                  }
                }, 5000);
              }
            });
        });
      });
    });
}