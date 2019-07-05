import { Workbox } from 'workbox-window';
import { sw } from '../art.config.js';

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

  workbox.addEventListener('installed', (event) => {
    console.log('installed', Date.now(), event);
    // bus.$emit('sw-need-update');
    // addMessageEventListenerToFetchResource();
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
      console.log('New content is available; please refresh.', Date.now(), event);
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
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        console.log(registration.scope);
        registration.unregister();
        // TODO 删除cache storage和indexedDB数据
        // TODO refresh
      });
    });
  } catch (error) {
    // TODO 对ServiceWorkerContainer对象中不包含getRegistrations方法的浏览器做兼容处理
    window.alert('注意！当前浏览器不支持 ServiceWorkerContainer.getRegistrations，可能导致功能异常！');
  }
}