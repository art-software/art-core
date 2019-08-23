exports.ids = [0];
exports.modules = {

/***/ "../../../node_modules/css-hot-loader/index.js!../../../node_modules/css-loader/index.js?!../../../node_modules/postcss-loader/src/index.js?!../../../node_modules/venus-px2rem-loader/index.js?!../../../node_modules/less-loader/dist/cjs.js?!./client/main/styles/product.less":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public/node_modules/css-hot-loader!/Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public/node_modules/css-loader??ref--7-2!/Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public/node_modules/postcss-loader/src??ref--7-3!/Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public/node_modules/venus-px2rem-loader??ref--7-4!/Users/bowenzhong/Documents/workspace_frontend_framework/art-core-public/node_modules/less-loader/dist/cjs.js??ref--7-5!./client/main/styles/product.less ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"product.less","sourceRoot":""}]);

// exports

    if(false) { var cssReload; }
  

/***/ }),

/***/ "./client/main/styles/product.less":
/*!*****************************************!*\
  !*** ./client/main/styles/product.less ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(/*! !../../../../../../node_modules/css-hot-loader!../../../../../../node_modules/css-loader??ref--7-2!../../../../../../node_modules/postcss-loader/src??ref--7-3!../../../../../../node_modules/venus-px2rem-loader??ref--7-4!../../../../../../node_modules/less-loader/dist/cjs.js??ref--7-5!./product.less */ "../../../node_modules/css-hot-loader/index.js!../../../node_modules/css-loader/index.js?!../../../node_modules/postcss-loader/src/index.js?!../../../node_modules/venus-px2rem-loader/index.js?!../../../node_modules/less-loader/dist/cjs.js?!./client/main/styles/product.less");
    var insertCss = __webpack_require__(/*! ../../../node_modules/isomorphic-style-loader/insertCss.js */ "./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) { var removeCss; }
  

/***/ }),

/***/ "./client/main/views/Product.tsx":
/*!***************************************!*\
  !*** ./client/main/views/Product.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_product_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/product.less */ "./client/main/styles/product.less");
/* harmony import */ var _styles_product_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_product_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! isomorphic-style-loader/withStyles */ "./node_modules/isomorphic-style-loader/withStyles.js");
/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

 // @ts-ignore



var products = [{
  name: 'product-1',
  desc: 'Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.'
}, {
  name: 'product-2',
  desc: 'Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least.'
}, {
  name: 'product-3',
  desc: 'Am increasing at contrasted in favourable he considered astonished. As if made held in an shot. By it enough to valley desire do. Mrs chief great maids these which are ham match she. Abode to tried do thing maids. Doubtful disposed returned rejoiced to dashwood is so up.'
}, {
  name: 'product-4',
  desc: 'Boisterous he on understood attachment as entreaties ye devonshire. In mile an form snug were been sell. Hastened admitted joy nor absolute gay its. Extremely ham any his departure for contained curiosity defective. Way now instrument had eat diminution melancholy expression sentiments stimulated. One built fat you out manor books. Mrs interested now his affronting inquietude contrasted cultivated. Lasting showing expense greater on colonel no.'
}];

var Product =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Product, _React$Component);

  function Product() {
    _classCallCheck(this, Product);

    return _possibleConstructorReturn(this, _getPrototypeOf(Product).apply(this, arguments));
  }

  _createClass(Product, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "product"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "product-wrapper"
      }, products.map(function (product) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "product-name"
        }, product.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "product-desc"
        }, product.desc));
      })));
    }
  }]);

  return Product;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_styles_product_less__WEBPACK_IMPORTED_MODULE_1___default.a)(Product));

/***/ })

};;
//# sourceMappingURL=0.41ebfad5aad32d7cf5cf.js.map