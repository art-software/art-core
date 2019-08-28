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

var WebApiMiniProgramCommon_1 = require("../../lib/art-lib-common-miniprogram/src/core/WebApiMiniProgramCommon");

var ensureSlash_1 = __importDefault(require("../../lib/art-dev-utils/lib/ensureSlash"));

var EnvNames_1 = require("../../lib/art-lib-common-miniprogram/src/enums/EnvNames");

var domains = {
  local: 'http://me.dev.com:8000',
  prod: 'http://me.dev.com:8000'
};

var WebApiCommon =
/*#__PURE__*/
function (_WebApiMiniProgramCom) {
  _inherits(WebApiCommon, _WebApiMiniProgramCom);

  function WebApiCommon() {
    var _this;

    _classCallCheck(this, WebApiCommon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebApiCommon).call(this, domains));
    _this.requestConfig = {};

    _this.setBasicRequestConfig(_this.requestConfig);

    return _this;
  }

  _createClass(WebApiCommon, [{
    key: "preRequest",
    value: function preRequest(requestConfig) {
      var _this2 = this;

      return new Promise(function (resolve) {
        var urlPath = ensureSlash_1.default(requestConfig.url, false);
        var domain = ensureSlash_1.default(_this2.getDomain(), false);

        if (_this2.getEnvName() === EnvNames_1.EnvNames.local) {
          domain = domain + '/mock_api';
        }

        requestConfig.url = domain + urlPath;
        resolve(requestConfig);
      });
    }
  }, {
    key: "afterRequestResolve",
    value: function afterRequestResolve(res) {
      return new Promise(function (resolve) {
        resolve(res.data);
      });
    }
  }]);

  return WebApiCommon;
}(WebApiMiniProgramCommon_1.WebApiMiniProgramCommon);

exports.WebApiCommon = WebApiCommon;