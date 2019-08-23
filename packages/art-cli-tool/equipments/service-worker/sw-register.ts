import { Workbox } from 'workbox-window';
import { sw } from '../../../../art.config.js';

interface SWEnableResponse {
  code: number;
  message: string;
  data: {
    enable: boolean
  };
}

export default function setServiceWorker() {
  if ('serviceWorker' in navigator) {
    if (sw.enable) {
      fetch('/sw/enable')
        .then((response) => response.json())
        .then((json: SWEnableResponse) => {
          if (json.data.enable) {
            if (process.env.NODE_ENV === 'production') {
              registerServiceWorker();
            }
          } else {
            unregisterServiceWorker();
          }
        })
        .catch((reason) => {
          console.error(reason);
        });
    }
  } else {
    // TODO 统计不兼容service worker的浏览器数据(navigator.userAgent)
  }
}

function registerServiceWorker() {
  const workbox = new Workbox('./service-worker.js');

  window.addEventListener('skipWaiting', (event) => {
    // 通知浏览器激活新的service worker
    workbox.messageSW({ type: 'SKIP_WAITING' });
  });

  workbox.addEventListener('installed', (event) => {
    console.log('installed', Date.now(), event);
    if (event.isUpdate) {
      window.dispatchEvent(new CustomEvent('showSwRefresh'));
    }
  });

  workbox.addEventListener('waiting', (event) => {
    console.log(`A new service worker has installed, but it can't activate` +
      `until all tabs running the current version have fully unloaded.`, Date.now(), event);
  });

  workbox.addEventListener('controlling', (event) => {
    console.log('controlling', Date.now(), event);
  });

  workbox.addEventListener('activated', (event) => {
    // `event.isUpdate` will be true if another version of the service
    // worker was controlling the page when this version was registered.
    if (event.isUpdate) {
      // TODO 统计资源更新(耗时、时间点、用户或设备标识)
      console.log('New content is available.', Date.now(), event);
      // Reload the page as soon as the previously waiting service worker has taken control.
      // 本来应该放在controlling回调中执行刷新，但是由于controlling event对象中没有isUpdate属性，所以只能放在这里
      window.location.reload();
    } else {
      // TODO 统计资源首次加载(耗时、时间点、用户或设备标识)
      console.log('Content has been cached for offline use.', Date.now(), event);
    }
  });

  // workbox.addEventListener('externalinstalled', (event) => { });
  // workbox.addEventListener('externalwaiting', (event) => { });
  // workbox.addEventListener('externalactivated', (event) => { });

  workbox.register();
}

function unregisterServiceWorker() {
  try {
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        if (registrations.length > 0) {
          deleteIndexedDBAndCacheStorage();
          registrations.forEach((registration) => {
            registration.unregister();
          });
          // 卸载完之后需要刷新页面，否则当前页面将使用之前service worker缓存的资源
          window.location.reload();
        }
      });
  } catch (error) {
    // TODO 对ServiceWorkerContainer对象中不包含getRegistrations方法的浏览器做兼容处理
    window.alert('注意！当前浏览器不支持 ServiceWorkerContainer.getRegistrations，可能导致功能异常！');
  }
}

function deleteIndexedDBAndCacheStorage() {
  try {
    indexedDB.deleteDatabase('workbox-expiration');
    caches.keys().then((cacheKeys) => {
      cacheKeys.forEach((key) => {
        caches.delete(key);
      });
    });
  } catch (error) {
    console.error(error);
  }
}