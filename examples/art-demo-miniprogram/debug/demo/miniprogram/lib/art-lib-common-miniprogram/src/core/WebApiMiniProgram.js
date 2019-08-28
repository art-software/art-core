"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var merge_js_1 = __importDefault(require("../../../art-lib-utils/dist/utils/merge.js"));

var lang_js_1 = require("../../../art-lib-utils/dist/utils/lang.js");

var HttpMethods_js_1 = require("../../../art-lib-common-miniprogram/src/enums/HttpMethods.js");

var WebApiMiniProgram =
/*#__PURE__*/
function () {
  function WebApiMiniProgram() {
    _classCallCheck(this, WebApiMiniProgram);

    this.basicRequestConfig = {};
  }

  _createClass(WebApiMiniProgram, [{
    key: "getBasicRequestConfig",
    value: function getBasicRequestConfig() {
      return this.basicRequestConfig;
    }
  }, {
    key: "setBasicRequestConfig",
    value: function setBasicRequestConfig(basicRequestConfig) {
      this.basicRequestConfig = merge_js_1.default(true, {}, this.basicRequestConfig, basicRequestConfig);
      return this.basicRequestConfig;
    }
  }, {
    key: "assertion",
    value: function assertion(target, message, checker) {
      var checkValue = target;

      if (lang_js_1.isFunction(checker)) {
        checkValue = checker(target);
      }

      if (checkValue === false) {
        throw new Error(message);
      }
    }
  }, {
    key: "requestGet",
    value: function requestGet(url, config) {
      var newConfig = merge_js_1.default(true, {}, config, {
        url: url,
        method: HttpMethods_js_1.HttpMethods.GET
      });
      return this.request(newConfig);
    }
  }, {
    key: "requestPost",
    value: function requestPost(url, config) {
      var newConfig = merge_js_1.default(true, {}, config, {
        url: url,
        method: HttpMethods_js_1.HttpMethods.POST
      });
      return this.request(newConfig);
    }
  }, {
    key: "requestPut",
    value: function requestPut(url, config) {
      var newConfig = merge_js_1.default(true, {}, config, {
        url: url,
        method: HttpMethods_js_1.HttpMethods.PUT
      });
      return this.request(newConfig);
    }
  }, {
    key: "requestDelete",
    value: function requestDelete(url, config) {
      var newConfig = merge_js_1.default(true, {}, config, {
        url: url,
        method: HttpMethods_js_1.HttpMethods.DELETE
      });
      return this.request(newConfig);
    }
  }, {
    key: "request",
    value: function request(requestConfig) {
      var _this = this;

      var mergedRequestConfig = merge_js_1.default(true, {}, this.basicRequestConfig, requestConfig);

      var urlCheck = function urlCheck(checkData) {
        return lang_js_1.isObject(checkData) && lang_js_1.isString(checkData.url);
      };

      this.assertion(mergedRequestConfig, 'request() http `requestConfig.url` must be providered!', urlCheck);
      return this.preRequest(mergedRequestConfig).then(function (config) {
        var dto = config.dto;
        return _this.requestPromise(config).then(function (res) {
          return _this.afterRequestResolve(res).then(dto);
        }).catch(_this.requestErrorHandler);
      }).catch(this.preRequestErrorHandler);
    }
  }, {
    key: "requestPromise",
    value: function requestPromise(requestConfig) {
      return new Promise(function (resolve, reject) {
        requestConfig = merge_js_1.default(true, {}, {
          success: function success(res) {
            resolve(res);
          },
          fail: function fail(res) {
            reject(res);
          }
        }, requestConfig);
        delete requestConfig.dto;
        delete requestConfig.query;
        wx.request(requestConfig);
      });
    }
  }, {
    key: "preRequest",
    value: function preRequest(requestConfig) {
      return new Promise(function (resolve) {
        resolve(requestConfig);
      });
    }
  }, {
    key: "preRequestErrorHandler",
    value: function preRequestErrorHandler(err) {
      return err;
    }
  }, {
    key: "afterRequestResolve",
    value: function afterRequestResolve(res) {
      return new Promise(function (resolve) {
        return resolve(res);
      });
    }
  }, {
    key: "requestErrorHandler",
    value: function requestErrorHandler(err) {
      return err;
    }
  }]);

  return WebApiMiniProgram;
}();

exports.WebApiMiniProgram = WebApiMiniProgram;