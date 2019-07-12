exports.ids = [0];
exports.modules = {

/***/ "./client/home/assets/icon-home.png":
/*!******************************************!*\
  !*** ./client/home/assets/icon-home.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA8xJREFUWAntlktIVFEYx50ZHxm+oNqMFTgKQxG18DUi9tJCkVypmyAQhNq16QFBi0BIWgUu27ToAVmClBRkKplKPsBoY1SMGalkTxhsdJyx3zfdM9zGO3fmjkEFHrjznfs9/ud/vu8790xKysb4gxlYXV21FRcXXy0pKemQ+Xqgkw5uampyeL3eaxBo0Qhcd7lcrZ2dncFkCCVFBBLpkLgJicaoRTt5Pz4xMRGI0sd9tUykoqIiMxAIdEGiNgZ6T3Z2duPAwIA/ht1QbYlIeXl5zsrKygOQqhSa3W5vg5Sd54LSIfsh0wAZn05nOnWYWnVGmnJrKBR6jMqj1Dab7dz4+Hjb7Oxsn9PpXEJfo9kKlpeXD7vd7nvT09MJZSYhIpWVlU4y0c8ie7WFQmTiFCQ6tPeUubm5Z/n5+Z95r+ORTG+nhLWFhYVdMzMzi8ovloxbmtLSUhdp7+UpEBCysII4AYnbRqD4t+Arp0ltcio9Pb1mZGTkg5G/0pkSoSd2kwkph1MCIOHnaR4bG7uvAIwkZJop4w1saWInxksGq0dHR71G/mGfWIaysrISwB6xsy2ajzReA0dTShR30FP1ELhL/CbNWTJSQ/yUUbDdSMmO9kPiiY7EVw0kIRKCyYI9ZKGeqTo5+cyfssF9Yo8ea4jwua6DgGQiR5zZ1TziAMDPo4PjvVOKPofDcRS/b5rvtmAwOEDJIydPYfxGhHQ2QaCbJ1NzeJeWllYFiZcqwKqEzAiZOUTcghabJ33Hhg/qsSLNimEPBF5gDJMjE694jtCY7/UByc49Hs8ujnMv8eHGRy5mZGQUDA8PfxTMSEZYVGqnSEzyfhJiHfTLGXFczxAMsnCZvmsFV52czejcCjeSEblD+BpeFAOf5ys+n+8WROTjJKOI8rz9NbX2C24RuK8lChIPyUKr3+8/T7nmKVs7ulWxpcqPDD44PxCR+4JS5YYN/KSmpuapuVVJFiI4xOYODQ3NIk8LDiREhEekNErxt2QkI1YIcLoKOZZZRjEcT18yZbScEUrWBoE3LDhp9IhN8zHiGVNnmQgNfCwmmmZIxCcaw3JpaDAHCymcGSYB7UUuuJ0yFx9Nl7CwnBE9Mtd7Nf0gR7tI5nqb1fm6iFhdzMz/nyGSUI/wKa7hyLq0HYVvZbPdYcuRC1R8iFVxpiEJEQGhXaHoGlWp1kh8dqC8s8ZgoohZGsC+mMSJKcQdov5nyDXwXXRmMWaYZhk5yzH0EZwVfRzRLXFpdfMX4ZNaeHBwcIFbtpW7pQH/DKUXiX9Qw7qk12/M/4sM/ATBJJ2M0qZVggAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./client/home/styles/home.less":
/*!**************************************!*\
  !*** ./client/home/styles/home.less ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./client/home/view/Home.tsx":
/*!***********************************!*\
  !*** ./client/home/view/Home.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Home; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_home_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/home.less */ "./client/home/styles/home.less");
/* harmony import */ var _styles_home_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_home_less__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var iconPath = __webpack_require__(/*! ../assets/icon-home.png */ "./client/home/assets/icon-home.png");

var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    var _this;

    _classCallCheck(this, Home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
    _this.state = {
      count: 0
    };

    _this.count = function () {
      _this.setState({
        count: ++_this.state.count
      });
    };

    return _this;
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      var style = {
        display: 'inline-block',
        width: '100px',
        height: '60px',
        border: 'none',
        marginRight: '20px'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "home"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "It's React SSR"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        style: style,
        onClick: this.count
      }, "Click to Add: ", this.state.count), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "home-background"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: iconPath,
        alt: "icon-home"
      }));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ })

};;
//# sourceMappingURL=0.f46a0aeb1221e1486c66.js.map