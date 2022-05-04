exports.ids = [0];
exports.modules = {

/***/ "../../../node_modules/css-hot-loader/index.js!../../../node_modules/css-loader/index.js?!../../../node_modules/postcss-loader/src/index.js?!../../../node_modules/venus-px2rem-loader/index.js?!../../../node_modules/less-loader/dist/cjs.js?!./client/main/styles/home.less":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /Users/bowen/Documents/workspace_art/art-core/node_modules/css-hot-loader!/Users/bowen/Documents/workspace_art/art-core/node_modules/css-loader??ref--7-2!/Users/bowen/Documents/workspace_art/art-core/node_modules/postcss-loader/src??ref--7-3!/Users/bowen/Documents/workspace_art/art-core/node_modules/venus-px2rem-loader??ref--7-4!/Users/bowen/Documents/workspace_art/art-core/node_modules/less-loader/dist/cjs.js??ref--7-5!./client/main/styles/home.less ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".home img{width:100%;height:100%}.index-page .title{margin-top:.3rem;text-align:center;font-size:.36rem}.index-page .btn-request{display:block;padding:.3rem;margin-left:auto;margin-right:auto;border:.01rem solid #666;border-radius:.3rem;margin-top:.2rem}", "", {"version":3,"sources":["/Users/bowen/Documents/workspace_art/art-core/examples/art-demo-ssr/web/client/main/styles/home.less"],"names":[],"mappings":"AAAA,UAAU,WAAW,WAAW,CAAC,mBAAmB,iBAAiB,kBAAkB,gBAAgB,CAAC,yBAAyB,cAAc,cAAc,iBAAiB,kBAAkB,yBAAyB,oBAAoB,gBAAgB,CAAC","file":"home.less","sourcesContent":[".home img{width:100%;height:100%}.index-page .title{margin-top:.3rem;text-align:center;font-size:.36rem}.index-page .btn-request{display:block;padding:.3rem;margin-left:auto;margin-right:auto;border:.01rem solid #666;border-radius:.3rem;margin-top:.2rem}"],"sourceRoot":""}]);

// exports

    if(false) { var cssReload; }
  

/***/ }),

/***/ "../../../node_modules/css-loader/lib/css-base.js":
/*!*********************************************************************************************!*\
  !*** /Users/bowen/Documents/workspace_art/art-core/node_modules/css-loader/lib/css-base.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../node_modules/isomorphic-style-loader/insertCss.js":
/*!*******************************************************************************************************!*\
  !*** /Users/bowen/Documents/workspace_art/art-core/node_modules/isomorphic-style-loader/insertCss.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */



var inserted = {};

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x" + p1);
  }));
}

function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(id);

      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

function insertCss(styles, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$replace = _ref.replace,
      replace = _ref$replace === void 0 ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === void 0 ? false : _ref$prepend,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;

  var ids = [];

  for (var i = 0; i < styles.length; i++) {
    var _styles$i = styles[i],
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];
    var id = "" + prefix + moduleId + "-" + i;
    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;
    var elem = document.getElementById(id);
    var create = false;

    if (!elem) {
      create = true;
      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;

    if (sourceMap && typeof btoa === 'function') {
      cssText += "\n/*# sourceMappingURL=data:application/json;base64," + b64EncodeUnicode(JSON.stringify(sourceMap)) + "*/";
      cssText += "\n/*# sourceURL=" + sourceMap.file + "?" + id + "*/";
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;
//# sourceMappingURL=insertCss.js.map


/***/ }),

/***/ "./client/main/assets/home/img-top-banner.jpg":
/*!****************************************************!*\
  !*** ./client/main/assets/home/img-top-banner.jpg ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "http://me.dev.com:3001/public/demo/ssr/main/assets/home/img-top-banner-49b3c972.jpg";

/***/ }),

/***/ "./client/main/styles/home.less":
/*!**************************************!*\
  !*** ./client/main/styles/home.less ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(/*! !../../../../../../node_modules/css-hot-loader!../../../../../../node_modules/css-loader??ref--7-2!../../../../../../node_modules/postcss-loader/src??ref--7-3!../../../../../../node_modules/venus-px2rem-loader??ref--7-4!../../../../../../node_modules/less-loader/dist/cjs.js??ref--7-5!./home.less */ "../../../node_modules/css-hot-loader/index.js!../../../node_modules/css-loader/index.js?!../../../node_modules/postcss-loader/src/index.js?!../../../node_modules/venus-px2rem-loader/index.js?!../../../node_modules/less-loader/dist/cjs.js?!./client/main/styles/home.less");
    var insertCss = __webpack_require__(/*! ../../../../../../node_modules/isomorphic-style-loader/insertCss.js */ "../../../node_modules/isomorphic-style-loader/insertCss.js");
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

/***/ "./client/main/views/Home.tsx":
/*!************************************!*\
  !*** ./client/main/views/Home.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_home_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/home.less */ "./client/main/styles/home.less");
/* harmony import */ var _styles_home_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_home_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var art_isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! art-isomorphic-style-loader/withStyles */ "./node_modules/art-isomorphic-style-loader/withStyles.js");
/* harmony import */ var art_isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(art_isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/store */ "./client/main/store/store.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
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







var topBanner = __webpack_require__(/*! ../assets/home/img-top-banner.jpg */ "./client/main/assets/home/img-top-banner.jpg");

var Home =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, _getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.initialData && this.props.initialData.length <= 0) {
        this.props.fetchDataMain();
      }
    }
  }, {
    key: "choiceAChange",
    value: function choiceAChange() {
      console.log('choiceAChange');
    }
  }, {
    key: "choiceBChange",
    value: function choiceBChange() {
      console.log('choiceBChange');
    }
  }, {
    key: "commandOnChange",
    value: function commandOnChange() {
      console.log('Common onChange');
    }
  }, {
    key: "render",
    value: function render() {
      var initialData = this.props.initialData;
      console.log('initialData: ', initialData);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "home"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: topBanner,
        alt: "top banner"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, initialData.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Link"], {
        to: "/product"
      }, "Product Page"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipiscin] velit, sed quia non numquam do eius modi tempora incididunt, ut labore et dolore magnam aliquam quaerat voluptatem."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Vero eos et accusamus et iusto odio dignissimos ducimus"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Qua temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae pondere ad lineam. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Quibus ego assentior, dum modo de iisdem rebus ne Graecos quidem legendos putent. Res vero bonaa verbis electis graviter omateque dictas quis i legat? Nisi qui se plane Graeciun dici velit, ut a 9 Scaeiola est praetore salutatus Athenis Albucius. Quem quidem locum cum multa venustate et omm sale idem Lucilius, apud quem praeclare Scaevola."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Qui autem alia matunt scribi a nobis, aequi esse debent, quod et seripta multa sunt, sic ut plura nemini e nostris, et scribentur fortasse plura si vita suppetet; et tamen qui diligenter haec quae de philosophia Htteris mandamus legere assueverit, iudicabit nulla ad legendum his esse potiora."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Tempore intellegi convenire"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Epicurus autem, in quibus sequitur Democritum, noil fere labitur, Quam- quam utriusque cum mutta non prolx). turn illiid in priniis, quoJ, cum in rerum nalura duo quaerenda sint, ununi quae materia sit ex qua quaeque res cfficiatur, alterum quae vis sit quae quidque efficiat, de materia disserucrunt, vim et causam efficiendi reliquerunt. Sed lioc commune vitiuni; illae Epicur propriae ruinae: censet enim eadem ilia indlvidua e solida corpora ferri deorsum suo pondere ad lineam i hunc naturalem esse omnium corporum motuni."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Deinde ibidem homo acutus, cam illud occorreret, j omnia deorsum e regione ferrentur et, ut dixi, ad lineam, numquam fore ut atomus altera alteram posset attingere, itaque attulit rem commenticiam."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Declinare dixit atomum perpaulum, quo nihil posset fieri minus; ita eifici complexiones et copulationes et adhaesiones atomorum inter se, ex quo eificeretur mundus omnesque partes mundi quaeque in eo essent. Quae cum res tota fieta sit piieriliter, turn ne efficit quidem^ quod vult. Nam et ipsa declinatio ad libidinem fiiigitur - ait enim deelinare atomum sine causa, quo nibil turpius physico quam fieri.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        role: "banner"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "HTML5 Test Page"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "This is a test page filled with common HTML elements to be used to provide visual feedback whilst building CSS systems and frameworks.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        role: "navigation"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text"
      }, "Text"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__headings"
      }, "Headings")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__paragraphs"
      }, "Paragraphs")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__blockquotes"
      }, "Blockquotes")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__lists"
      }, "Lists")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__hr"
      }, "Horizontal rules")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__tables"
      }, "Tabular data")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__code"
      }, "Code")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__inline"
      }, "Inline elements")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#text__comments"
      }, "HTML Comments")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded"
      }, "Embedded content"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__images"
      }, "Images")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__audio"
      }, "Audio")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__video"
      }, "Video")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__canvas"
      }, "Canvas")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__meter"
      }, "Meter")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__progress"
      }, "Progress")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__svg"
      }, "Inline SVG")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#embedded__iframe"
      }, "IFrames")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms"
      }, "Form elements"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__input"
      }, "Input fields")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__select"
      }, "Select menus")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__checkbox"
      }, "Checkboxes")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__radio"
      }, "Radio buttons")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__textareas"
      }, "Textareas")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__html5"
      }, "HTML5 inputs")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#forms__action"
      }, "Action buttons")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
        role: "main"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        id: "text"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Text")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__headings"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Headings")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Heading 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Heading 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Heading 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Heading 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "Heading 5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h6", null, "Heading 6")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__paragraphs"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Paragraphs")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "A paragraph (from the Greek paragraphos, \u201Cto write beside\u201D or \u201Cwritten beside\u201D) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__blockquotes"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Blockquotes")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("blockquote", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("cite", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#!"
      }, "Said no one, ever.")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__lists"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Lists")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Definition list"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dl", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dt", null, "Definition List Title"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dd", null, "This is a definition list division.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Ordered List"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "List Item 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "List Item 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "List Item 3")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Unordered List"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "List Item 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "List Item 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, "List Item 3"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__hr"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Horizontal rules")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__tables"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Tabular data")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("caption", null, "Table Caption"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Heading 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Heading 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Heading 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Heading 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Heading 5"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tfoot", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Footer 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Footer 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Footer 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Footer 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Table Footer 5"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 5")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 5")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 5")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 1"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "Table Cell 5")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__code"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Code")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Keyboard input:"), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("kbd", null, "Cmd")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Inline code:"), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "<div>code</div>")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Sample output:"), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("samp", null, "This is sample output from a computer program.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Pre-formatted text"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, "P R E F O R M A T T E D T E X T ! \" # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z  ~ ")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Inline elements")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#!"
      }, "This is a text link"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Strong is used to indicate strong importance.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "This text has added emphasis.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "b element"), " is stylistically different text from normal text, without any special importance."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "i element"), " is text that is offset from the normal text."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("u", null, "u element"), " is text with an unarticulated, though explicitly rendered, non-textual annotation."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("del", null, "This text is deleted"), " and ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ins", null, "This text is inserted"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("s", null, "This text has a strikethrough"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Superscript", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sup", null, "\xAE"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Subscript for things like H", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("sub", null, "2"), "O."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, "This small text is small for for fine print, etc.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Abbreviation: ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("abbr", {
        title: "HyperText Markup Language"
      }, "HTML")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("q", {
        cite: "https://developer.mozilla.org/en-US/docs/HTML/Element/q"
      }, "This text is a short inline quotation.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("cite", null, "This is a citation.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("dfn", null, "dfn element"), " indicates a definition."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("mark", null, "mark element"), " indicates a highlight."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("var", null, "variable element"), ", such as ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("var", null, "x"), " = ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("var", null, "y"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The time element: ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", {
        "data-datetime": "2013-04-06T12:32+00:00"
      }, "2 weeks ago"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "text__comments"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "HTML Comments")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "There is a comment spanning multiple tags and lines below here."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#!"
      }, "This is a text link. But it should not be displayed in a comment"), "."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Strong is used to indicate strong importance. But, it should not be displayed in a comment")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "This text has added emphasis. But, it should not be displayed in a comment"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        id: "embedded"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Embedded content")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__images"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Images")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "No ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "<figure>"), " element"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "http://placekitten.com/480/480",
        alt: "Image alt text"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Wrapped in a ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "<figure>"), " element, no ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "<figcaption>")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "http://placekitten.com/420/420",
        alt: "Image alt text"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "Wrapped in a ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "<figure>"), " element, with a ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, "<figcaption>")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "http://placekitten.com/420/420",
        alt: "Image alt text"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figcaption", null, "Here is a caption for this image."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__audio"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Audio")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("audio", {
        controls: false
      }, "audio")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__video"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Video")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("video", {
        controls: false
      }, "video")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__canvas"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Canvas")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", null, "canvas")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__meter"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Meter")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meter", {
        value: "2",
        min: "0",
        max: "10",
        onChange: this.commandOnChange
      }, "2 out of 10")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__progress"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Progress")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("progress", null, "progress")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__svg"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Inline SVG")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        width: "100px",
        height: "100px"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
        cx: "100",
        cy: "100",
        r: "100",
        fill: "#1fa3ec"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
        id: "embedded__iframe"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "IFrame")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        id: "forms"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Form elements")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__input"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "Input fields"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__text"
      }, "Text Input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__text",
        type: "text",
        placeholder: "Text Input"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__password"
      }, "Password"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__password",
        type: "password",
        placeholder: "Type your Password"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__webaddress"
      }, "Web Address"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__webaddress",
        type: "url",
        placeholder: "http://yoursite.com"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__emailaddress"
      }, "Email Address"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__emailaddress",
        type: "email",
        placeholder: "name@email.com"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__phone"
      }, "Phone Number"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__phone",
        type: "tel",
        placeholder: "(999) 999-9999"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__search"
      }, "Search"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__search",
        type: "search",
        placeholder: "Enter Search Term"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__text2"
      }, "Number Input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__text2",
        type: "number",
        placeholder: "Enter a Number"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__text3",
        className: "error"
      }, "Error"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__text3",
        className: "is-error",
        type: "text",
        placeholder: "Text Input"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "input__text4",
        className: "valid"
      }, "Valid"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "input__text4",
        className: "is-valid",
        type: "text",
        placeholder: "Text Input"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__select"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "Select menus"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "select"
      }, "Select"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        id: "select"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("optgroup", {
        label: "Option Group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Option One"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Option Two"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "Option Three"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__checkbox"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "Checkboxes"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list list--bare"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "checkbox1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "checkbox1",
        name: "checkbox",
        type: "checkbox",
        checked: true,
        onChange: this.choiceAChange
      }), " Choice A")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "checkbox2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "checkbox2",
        name: "checkbox",
        type: "checkbox"
      }), " Choice B")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "checkbox3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "checkbox3",
        name: "checkbox",
        type: "checkbox"
      }), " Choice C")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__radio"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "Radio buttons"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list list--bare"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "radio1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "radio1",
        name: "radio",
        type: "radio",
        className: "radio",
        checked: true,
        onChange: this.choiceBChange
      }), " Option 1")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "radio2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "radio2",
        name: "radio",
        type: "radio",
        className: "radio"
      }), " Option 2")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "radio3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "radio3",
        name: "radio",
        type: "radio",
        className: "radio"
      }), " Option 3")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__textareas"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "Textareas"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "textarea"
      }, "Textarea"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        id: "textarea",
        rows: 8,
        cols: 48,
        placeholder: "Enter your message here"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__html5"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "HTML5 inputs"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "ic"
      }, "Color input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "color",
        id: "ic",
        value: "#000000",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "in"
      }, "Number input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "number",
        id: "in",
        min: "0",
        max: "10",
        value: "5",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "ir"
      }, "Range input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "range",
        id: "ir",
        value: "10",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "idd"
      }, "Date input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "date",
        id: "idd",
        value: "1970-01-01",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "idm"
      }, "Month input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "month",
        id: "idm",
        value: "1970-01",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "idw"
      }, "Week input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "week",
        id: "idw",
        value: "1970-W01",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "idt"
      }, "Datetime input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "datetime",
        id: "idt",
        value: "1970-01-01T00:00:00Z",
        onChange: this.commandOnChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "idtl"
      }, "Datetime-local input"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "datetime-local",
        id: "idtl",
        value: "1970-01-01T00:00",
        onChange: this.commandOnChange
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        id: "forms__action"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "Action buttons"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        value: "<input type=submit>",
        onChange: this.commandOnChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "button",
        value: "<input type=button>",
        onChange: this.commandOnChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "reset",
        value: "<input type=reset>",
        onChange: this.commandOnChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "submit",
        value: "<input disabled>",
        disabled: true
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit"
      }, "<button type=submit>"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button"
      }, "<button type=button>"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "reset"
      }, "<button type=reset>"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        disabled: true
      }, "<button disabled>"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#top"
      }, "[Top]"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "1. Overview 51.1 Introduction 51.1.1 Design Principles 51.2 Open Financial Exchange at a Glance 71.2.1 Data Transport 71.2.2 Request and Response Model 81.3 Conventions 92. Structure 102.1 HTTP Headers 102.2 Open Financial Exchange Headers 112.2.1 The Meaning of Version Numbers 122.3 SGML Details 122.3.1 Compliance 122.3.2 Special Characters 122.4 Open Financial Exchange SGML Structure 132.4.1 Overview 132.4.2 Top Level 132.4.3 Messages 132.4.4 Message Sets and Version Control 142.4.5 Transactions 152.5 The Signon Message Set 162.5.1 Signon <SONRQ> <SONRS> 162.5.2 PIN Change <PINCHRQ> <PINCHRS> 192.5.3 Examples 202.6 External Data Support 202.7 Extensions to Open Financial Exchange 213. Common Aggregates, Elements, and Data Types 223.1 Common Aggregates 223.1.1 Identifying Financial Institutions and Accounts 223.1.2 Balance Records <BAL> 223.1.3 Error Reporting <STATUS> 233.2 Common Elements 243.2.1 Financial Institution Transaction ID <FITID> 243.2.2 Server-Assigned ID <SRVRTID> 243.2.3 Client-Assigned Transaction UID <TRNUID> 253.2.4 Token <TOKEN> 253.2.5 Transaction Amount <TRNAMT> 253.2.6 Memo <MEMO> 253.2.7 Date Start and Date End <DTSTART> <DTEND> 263.3 Common data types 263.3.1 Dates and Times 263.3.2 Amounts, Prices, and Quantities 283.3.3 Language 283.3.4 Basic data types 284. Security 294.1 Security Solutions 294.1.1 Determining Security Levels <OFXSEC> <TRANSPSEC> 294.2 Channel-Level Security 304.2.1 Security Requirements 304.2.2 Using SSL 3.0 in Open Financial Exchange 304.3 Application-Level Security 314.3.1 Requirements for Application-Layer Security 314.3.2 Using Application-level Encryption in Open Financial Exchange 325. International Support 335.1 Language and Encoding 335.2 Currency <CURDEF> <CURRENCY> <ORIGCURRENCY> 335.3 Country-Specific Tag Values 346. Data Synchronization 356.1 Overview 356.2 Background 356.3 Data Synchronization Approach 366.4 Data Synchronization Specifics 376.5 Conflict Detection and Resolution 396.6 Synchronization vs. Refresh 406.7 Typical Server Architecture for Synchronization 416.8 Typical Client Processing of Synchronization Results 436.9 Simultaneous Connections 446.10 Synchronization Alternatives 446.10.1 Lite Synchronization 446.10.2 Relating Synchronization and Error Recovery 456.11 Examples 467. FI Profile 487.1 Overview 487.1.1 Message Sets 487.1.2 Version Control 497.1.3 Batching and Routing 497.2 Profile Request 507.3 Profile Response 517.3.1 Message Set 527.3.2 Signon Realms 537.3.3 Status Codes 537.4 Profile Message Set Profile Information 548. Activation & Account Information 558.1 Overview 558.2 Approaches to User Sign-Up with Open Financial Exchange 558.3 Users and Accounts 568.4 Enrollment and Password Acquisition <ENROLLRQ> <ENROLLRS> 568.4.1 User IDs 578.4.2 Enrollment Request 578.4.3 Enrollment Response 598.4.4 Enrollment Status Codes 598.4.5 Examples 608.5 Account Information 608.5.1 Request <ACCTINFORQ> 618.5.2 Response <ACCTINFORS> 618.5.3 Account Information Aggregate <ACCTINFO> 628.5.4 Status Codes 628.5.5 Examples 638.6 Service Activation 638.6.1 Activation Request and Response 648.6.2 Service Activation Synchronization 668.6.3 Examples 668.7 Name and Address Changes <CHGUSERINFORQ> <CHGUSERINFORS> 678.7.1 <CHGUSERINFORQ> 678.7.2 <CHGUSERINFORS> 688.7.3 Status Codes 688.8 Signup Message Set Profile Information 699. Customer to FI Communication 709.1 The E-Mail Message Set 709.2 E-Mail Messages 709.2.1 Regular vs. Specialized E-Mail 719.2.2 Basic <MAIL> Aggregate 719.2.3 E-Mail <MAILRQ> <MAILRS> 719.2.4 E-Mail Synchronization <MAILSYNCRQ> <MAILSYNCRS> 729.2.5 Example 739.3 Get HTML Page 749.3.1 MIME Get Request and Response <GETMIMERQ> <GETMIMERS> 749.3.2 Example 759.4 E-Mail Message Set Profile Information 7610. Recurring Transactions 7710.1 Creating a Recurring Model 7710.2 Recurring Instructions <RECURRINST> 7710.2.1 Values for <FREQ> 7810.2.2 Examples 7910.3 Retrieving Transactions Generated by a Recurring Model 8010.4 Modifying and Canceling Individual Transactions 8010.5 Modifying and Canceling Recurring Models 8010.5.1 Examples 81"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Open Financial Exchange is a broad-based framework for exchanging financial data and instructions between customers and their financial institutions. It allows institutions to connect directly to their customers without requiring an intermediary. ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Home.serverFetch = _store_store__WEBPACK_IMPORTED_MODULE_3__["fetchDataMain"];

var mapStateToProps = function mapStateToProps(state) {
  return {
    initialData: state.data
  };
};

var mapDispatchToProps = {
  fetchDataMain: _store_store__WEBPACK_IMPORTED_MODULE_3__["fetchDataMain"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(art_isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_styles_home_less__WEBPACK_IMPORTED_MODULE_1___default.a)(Home)));

/***/ }),

/***/ "./node_modules/art-isomorphic-style-loader/withStyles.js":
/*!****************************************************************!*\
  !*** ./node_modules/art-isomorphic-style-loader/withStyles.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */



var React = __webpack_require__(/*! react */ "./node_modules/art-isomorphic-style-loader/node_modules/react/index.js");
var hoistStatics = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
var StyleContext = __webpack_require__(/*! ./StyleContext.js */ "./node_modules/art-isomorphic-style-loader/StyleContext.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function withStyles() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  return function wrapWithStyles(ComposedComponent) {
    var WithStyles = function (_React$PureComponent) {
      _inheritsLoose(WithStyles, _React$PureComponent);

      function WithStyles() {
        return _React$PureComponent.apply(this, arguments) || this;
      }

      var _proto = WithStyles.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      };

      _proto.render = function render() {
        var _this = this;

        return React.createElement(StyleContext.Consumer, null, function (_ref) {
          var insertCss = _ref.insertCss;
          _this.removeCss = insertCss.apply(void 0, styles);
          return React.createElement(ComposedComponent, _this.props);
        });
      };

      return WithStyles;
    }(React.PureComponent);

    var displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
    WithStyles.displayName = "WithStyles(" + displayName + ")";
    WithStyles.contextType = StyleContext;
    WithStyles.ComposedComponent = ComposedComponent;
    return hoistStatics(WithStyles, ComposedComponent);
  };
}

module.exports = withStyles;
//# sourceMappingURL=withStyles.js.map


/***/ })

};;
//# sourceMappingURL=0.ac16f11350d8dee9150d.js.map