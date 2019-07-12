webpackHotUpdate("demo/ssr/react/home2",{

/***/ "../art-ssr-react-router/dist/reactRouterHelper.jsx":
/*!**********************************************************!*\
  !*** ../art-ssr-react-router/dist/reactRouterHelper.jsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importDefault(__webpack_require__(/*! react */ "../../node_modules/react/index.js"));

var react_router_config_1 = __webpack_require__(/*! react-router-config */ "../../node_modules/react-router-config/esm/react-router-config.js");

exports.convertCustomRouteConfig = function (customRouteConfig, parentRoute) {
  return customRouteConfig.map(function (route) {
    if (typeof route.path === 'function') {
      var pathResult = route.path(parentRoute || '').replace('//', '/');
      return {
        path: pathResult,
        component: route.component,
        exact: route.exact,
        routes: route.routes ? exports.convertCustomRouteConfig(route.routes, pathResult) : []
      };
    }

    var path = "".concat(parentRoute).concat(route.path);
    return {
      path: path,
      component: route.component,
      exact: route.exact,
      routes: route.routes ? exports.convertCustomRouteConfig(route.routes, path) : []
    };
  });
};

exports.generateAsyncRouteComponent = function (component) {
  var loader = component.loader,
      Placeholder = component.Placeholder;
  var Component;
  return (
    /*#__PURE__*/
    function (_react_1$default$Comp) {
      _inherits(AsyncRouteComponent, _react_1$default$Comp);

      function AsyncRouteComponent(props, context) {
        var _this;

        _classCallCheck(this, AsyncRouteComponent);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AsyncRouteComponent).call(this, props, context));
        _this.state = {
          Component: Component
        };

        _this.updateState = function () {
          if (_this.state.Component !== Component) {
            _this.setState({
              Component: Component
            });
          }
        };

        return _this;
      }

      _createClass(AsyncRouteComponent, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          AsyncRouteComponent.load().then(this.updateState);
        }
      }, {
        key: "render",
        value: function render() {
          var ComponentFromState = this.state.Component;

          if (ComponentFromState) {
            // return <ComponentFromState { ...this.props } />;
            return react_1.default.createElement(ComponentFromState, this.props);
          }

          if (Placeholder) {
            // return <Placeholder {...this.props} />;
            return react_1.default.createElement(Placeholder, this.props);
          }

          return null;
        }
      }], [{
        key: "load",
        value: function load() {
          return loader().then(function (ResolvedComponent) {
            Component = ResolvedComponent.default || ResolvedComponent;
          }).catch(function (err) {
            console.log('load component error: ', err);
          });
        }
      }]);

      return AsyncRouteComponent;
    }(react_1.default.Component)
  );
};
/**
 * First match the routes via react-router-config's `matchRoutes` function.
 * Then iterate over all of the matched routes, if they've got a load function
 * call it.
 *
 * This helps us to make sure all the async code is loaded before rendering.
 */


exports.ensureReady = function (routeConfig, providedLocation) {
  var matches = react_router_config_1.matchRoutes(routeConfig, providedLocation || window.location.pathname);
  return Promise.all(matches.map(function (match) {
    var component = match.route.component;

    if (component && component.load) {
      try {
        component.load().catch(function (err) {
          console.log('err: ', err);
        });
        return component.load();
      } catch (err) {
        console.log('catched err: ', err);
      }
    }

    return undefined;
  }));
};

/***/ })

})
//# sourceMappingURL=home2.e2d91cb703571e79d8a7.hot-update.js.map