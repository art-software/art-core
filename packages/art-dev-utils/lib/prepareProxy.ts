import { redText, cyanText } from './chalkColors';
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import address from 'address';

function resolveLoopback(proxy) {
  const o = url.parse(proxy);
  o.host = null;
  if (o.hostname !== 'localhost') {
    return proxy;
  }
  // Unfortunately, many languages (unlike node) do not yet support IPv6.
  // This means even though localhost resolves to ::1, the application
  // must fall back to IPv4 (on 127.0.0.1).
  // We can re-enable this in a few years.
  /*try {
    o.hostname = address.ipv6() ? '::1' : '127.0.0.1';
  } catch (_ignored) {
    o.hostname = '127.0.0.1';
  }*/

  try {
    // Check if we're on a network; if we are, chances are we can resolve
    // localhost. Otherwise, we can just be safe and assume localhost is
    // IPv4 for maximum compatibility.
    if (!address.ip()) {
      o.hostname = '127.0.0.1';
    }
  } catch (_ignored) {
    o.hostname = '127.0.0.1';
  }
  return url.format(o);
}

// We need to provide a custom onError function for httpProxyMiddleware.
// It allows us to log custom error messages on the console.
function onProxyError(proxy) {
  return (err, req, res) => {
    const host = req.headers && req.headers.host;
    console.log(
      redText('Proxy error:') +
      ' Could not proxy request ' +
      cyanText(req.url) +
      ' from ' +
      cyanText(host) +
      ' to ' +
      cyanText(proxy) +
      '.'
    );
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
      cyanText(err.code) +
      ').'
    );
    console.log();

    // And immediately send the proper error response to the client.
    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }
    res.end(
      'Proxy error: Could not proxy request ' +
      req.url +
      ' from ' +
      host +
      ' to ' +
      proxy +
      ' (' +
      err.code +
      ').'
    );
  };
}

function prepareProxy(proxy: object, appPublicFolder?: string) {
  // `proxy` lets you specify alternate servers for specific requests.
  // It can either be a string or an object conforming to the Webpack dev server proxy configuration
  if (!proxy) { return undefined; }

  if (typeof proxy !== 'object' && typeof proxy !== 'string') {
    console.log(
      redText('When specified, "proxy" in package.json must be a string or an object.')
    );
    console.log(
      redText('Instead, the type of "proxy" was "' + typeof proxy + '".')
    );
    console.log(
      redText('Either remove "proxy" from package.json, or make it an object.')
    );
    process.exit(1);
  }

  // Otherwise, if proxy is specified, we will let it handle any request except for files in the public folder.
  function potentialProxy(pathname: string): boolean {
    if (appPublicFolder === undefined) { return false; }
    const potentialPublicPath = path.resolve(appPublicFolder, pathname.slice(1));
    return !fs.existsSync(potentialPublicPath);
  }

  // Support proxy as a string for those who are using the simple proxy option
  if (typeof proxy === 'string') {
    if (!/^http(s)?:\/\//.test(proxy)) {
      console.log(
        redText('When "proxy" is specified in package.json it must start with either http:// or https://')
      );
      process.exit(1);
    }

    let target;
    if (process.platform === 'win32') {
      target = resolveLoopback(proxy);
    } else {
      target = proxy;
    }

    return [
      {
        target,
        logLevel: 'slient',
        context(pathname, req) {
          return (
            potentialProxy(pathname) &&
            req.headers.accept &&
            req.headers.accept.indexOf('text/html') === -1
          );
        },
        onProxyReq(proxyReq) {
          // Browers may send Origin headers even with same-origin
          // requests. To prevent CORS issues, we have to change
          // the Origin to match the target URL.
          if (proxyReq.getHeader('origin')) {
            proxyReq.setHeader('origin', target);
          }
        },
        onError: onProxyError(target),
        secure: false,
        changeOrigin: true,
        ws: true,
        xfwd: true
      }
    ];
  }

  // Otherwise, proxy is an object so create an array of proxies to pass to webpackDevServer
  return Object.keys(proxy).map(function (context) {
    if (!proxy[context].hasOwnProperty('target')) {
      console.log(
        redText('When `proxy` in package.json is as an object, each `context` object must have a ' +
          '`target` property specified as a url string')
      );
      process.exit(1);
    }

    let target;
    if (process.platform === 'win32') {
      target = resolveLoopback(proxy[context].target);
    } else {
      target = proxy[context].target;
    }

    return Object.assign({}, proxy[context], {
      context(pathname) {
        return potentialProxy(pathname) && pathname.match(context);
      },
      onProxyReq(proxyReq){
        // Browers may send Origin headers even with same-origin
        // requests. To prevent CORS issues, we have to change
        // the Origin to match the target URL.
        if (proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', target);
        }
      },
      target,
      onError: onProxyError(target)
    });
  });
}

export default prepareProxy;