webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/entities/field/index.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("./node_modules/react/index.js");
var react_router_dom_1 = __webpack_require__("./node_modules/react-router-dom/es/index.js");
var react_router_modal_1 = __webpack_require__("./node_modules/react-router-modal/lib/index.js");
var field_1 = __webpack_require__("./src/main/webapp/app/entities/field/field.tsx");
var field_detail_1 = __webpack_require__("./src/main/webapp/app/entities/field/field-detail.tsx");
var field_dialog_1 = __webpack_require__("./src/main/webapp/app/entities/field/field-dialog.tsx");
var field_delete_dialog_1 = __webpack_require__("./src/main/webapp/app/entities/field/field-delete-dialog.tsx");
var Routes = function (_a) {
    var match = _a.match;
    return (React.createElement("div", null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: match.url, component: field_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: match.url + "/new", component: field_dialog_1.default }),
            React.createElement(react_router_modal_1.ModalRoute, { exact: true, parentPath: match.url, path: match.url + "/:id/delete", component: field_delete_dialog_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: match.url + "/:id/edit", component: field_dialog_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: match.url + "/:id", component: field_detail_1.default }))));
};
exports.default = Routes;


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field\\index.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field\\index.tsx"); } } })();

/***/ })

})
//# sourceMappingURL=1.388ad07843d0e28884d9.hot-update.js.map