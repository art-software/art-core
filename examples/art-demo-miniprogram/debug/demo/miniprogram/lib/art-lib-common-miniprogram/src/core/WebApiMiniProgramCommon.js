"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WebApiMiniProgram_js_1 = require("../../../art-lib-common-miniprogram/src/core/WebApiMiniProgram.js");

var urlWxMiniprogram_js_1 = require("../../../art-lib-utils-wx/dist/utils/urlWxMiniprogram.js");

var EnvNames_js_1 = require("../../../art-lib-common-miniprogram/src/enums/EnvNames.js");

var ensureSlash_js_1 = __importDefault(require("../../../art-dev-utils/lib/ensureSlash.js"));

var WebApiMiniProgramCommon =
/*#__PURE__*/
function (_WebApiMiniProgram_js) {
  _inherits(WebApiMiniProgramCommon, _WebApiMiniProgram_js);

  function WebApiMiniProgramCommon(domainConfig) {
    var _this;

    _classCallCheck(this, WebApiMiniProgramCommon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebApiMiniProgramCommon).call(this));
    _this.domainConfig = domainConfig;
    return _this;
  }

  _createClass(WebApiMiniProgramCommon, [{
    key: "getEnvName",
    value: function getEnvName() {
      return urlWxMiniprogram_js_1.getQueryString('env') || EnvNames_js_1.EnvNames.prod;
    }
  }, {
    key: "getPort",
    value: function getPort() {
      return urlWxMiniprogram_js_1.getQueryString('port') || '';
    }
  }, {
    key: "getDomain",
    value: function getDomain() {
      var envName = this.getEnvName();
      var port = this.getPort();
      var domain = this.domainConfig[envName] || '';

      if (port) {
        domain = "".concat(domain, ":").concat(port);
      }

      return domain || '';
    }
  }, {
    key: "preRequest",
    value: function preRequest(requestConfig) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var urlPath = ensureSlash_js_1.default(requestConfig.url, false);
        var domain = ensureSlash_js_1.default(_this2.getDomain(), false);

        if (_this2.getEnvName() === EnvNames_js_1.EnvNames.local) {
          domain = domain + '/mock_api';
        }

        requestConfig.url = domain + urlPath;
        resolve(requestConfig);
      });
    }
  }]);

  return WebApiMiniProgramCommon;
}(WebApiMiniProgram_js_1.WebApiMiniProgram);

exports.WebApiMiniProgramCommon = WebApiMiniProgramCommon;