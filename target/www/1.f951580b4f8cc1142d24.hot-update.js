webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/entities/field/field-detail.tsx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__("./node_modules/react/index.js");
var react_redux_1 = __webpack_require__("./node_modules/react-redux/es/index.js");
var field_reducer_1 = __webpack_require__("./src/main/webapp/app/entities/field/field.reducer.ts");
var field_option_reducer_1 = __webpack_require__("./src/main/webapp/app/entities/field-option/field-option.reducer.ts");
var availity_reactstrap_validation_1 = __webpack_require__("./node_modules/availity-reactstrap-validation/lib/index.js");
var FieldDetail = /** @class */ (function (_super) {
    __extends(FieldDetail, _super);
    function FieldDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldDetail.prototype.componentDidMount = function () {
        if (!this.props.Entity) {
            this.props.getEntity(this.props.match.params.id);
        }
        this.props.getFieldOptions();
    };
    FieldDetail.prototype.render = function () {
        var _a = this.props, fieldKey = _a.fieldKey, fieldValue = _a.fieldValue;
        var field = this.props.Entity || this.props.field;
        var fieldOptions = this.props.fieldOptions.filter(function (fieldOption) { return fieldOption.field.id === field.id; });
        var fieldType = function (field) {
            switch (field.type.toLowerCase()) {
                case 'text':
                case 'textarea':
                case 'number':
                    return React.createElement(availity_reactstrap_validation_1.AvInput, { key: fieldKey, id: field.id, type: field.type.toLowerCase(), className: "form-control", name: field.name, title: field.title, value: fieldValue });
                case 'select':
                    return React.createElement(availity_reactstrap_validation_1.AvInput, { type: "select", key: fieldKey, name: field.name, label: field.title, value: fieldValue, helpMessage: "" }, fieldOptions.map(function (fieldOption) { return (React.createElement("option", { value: fieldOption.value }, fieldOption.label)); }));
                case 'radio':
                    return React.createElement(availity_reactstrap_validation_1.AvRadioGroup, { name: field.name, key: fieldKey, value: fieldValue, label: field.title, errorMessage: "" }, fieldOptions.map(function (fieldOption) { return (React.createElement(availity_reactstrap_validation_1.AvRadio, { label: fieldOption.label, value: fieldOption.value })); }));
                case 'checkbox':
                    return React.createElement(availity_reactstrap_validation_1.AvInput, { key: fieldKey, id: field.id, type: field.type.toLowerCase(), className: "form-control", name: field.name, title: field.title, value: fieldValue });
            }
        };
        return (React.createElement("div", null,
            React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                React.createElement("label", null, field.title),
                fieldType(field))));
    };
    return FieldDetail;
}(React.Component));
exports.FieldDetail = FieldDetail;
var mapStateToProps = function (storeState) { return ({
    field: storeState.field.entity,
    fieldOptions: storeState.fieldOption.entities
}); };
var mapDispatchToProps = { getEntity: field_reducer_1.getEntity, getFieldOptions: field_option_reducer_1.getEntities };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FieldDetail);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field\\field-detail.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field\\field-detail.tsx"); } } })();

/***/ })

})
//# sourceMappingURL=1.f951580b4f8cc1142d24.hot-update.js.map