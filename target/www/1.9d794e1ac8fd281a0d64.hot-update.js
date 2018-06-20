webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/entities/field/field-dialog.tsx":
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
var react_router_dom_1 = __webpack_require__("./node_modules/react-router-dom/es/index.js");
var reactstrap_1 = __webpack_require__("./node_modules/reactstrap/dist/reactstrap.es.js");
var availity_reactstrap_validation_1 = __webpack_require__("./node_modules/availity-reactstrap-validation/lib/index.js");
var react_jhipster_1 = __webpack_require__("./node_modules/react-jhipster/bundles/react-jhipster.umd.js");
var fa_1 = __webpack_require__("./node_modules/react-icons/lib/fa/index.js");
var field_reducer_1 = __webpack_require__("./src/main/webapp/app/entities/field/field.reducer.ts");
var field_option_reducer_1 = __webpack_require__("./src/main/webapp/app/entities/field-option/field-option.reducer.ts");
var FieldDialog = /** @class */ (function (_super) {
    __extends(FieldDialog, _super);
    function FieldDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.saveEntity = function (event, errors, values) {
            if (_this.state.isNew) {
                _this.props.createEntity(values);
            }
            else {
                _this.props.updateEntity(values);
            }
            _this.handleClose();
        };
        _this.handleClose = function () {
            _this.setState({
                showModal: false
            });
            if (!_this.state.formId) {
                _this.props.history.push('/field');
            }
            else {
                _this.props.history.push("/form/" + _this.state.formId + "/edit");
            }
        };
        _this.formUpdate = function (element) {
            var id = element.target.value;
            for (var i in _this.props.forms) {
                if (id.toString() === _this.props.forms[i].id.toString()) {
                    _this.setState({
                        formId: _this.props.forms[i].id
                    });
                }
            }
        };
        _this.state = {
            isNew: !_this.props.match || !_this.props.match.params || !_this.props.match.params.id,
            formId: 0,
            showModal: true
        };
        return _this;
    }
    FieldDialog.prototype.componentDidMount = function () {
        !this.state.isNew && this.props.getEntity(this.props.match.params.id);
        if (this.props.match.params.formId) {
            this.setState({
                formId: +this.props.match.params.formId
            });
        }
        this.props.getFieldOptions();
    };
    FieldDialog.prototype.render = function () {
        var _this = this;
        var isInvalid = false;
        var _a = this.props, field = _a.field, forms = _a.forms, loading = _a.loading, updating = _a.updating;
        var _b = this.state, showModal = _b.showModal, isNew = _b.isNew;
        var fieldOptions = this.props.fieldOptions.filter(function (fieldOption) { return fieldOption.field.id === _this.props.field.id; });
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.field.home.createOrEditLabel" }, "Create or edit a Field")),
            loading ? React.createElement("p", null, "Loading...")
                : React.createElement(availity_reactstrap_validation_1.AvForm, { model: isNew ? {} : field, onSubmit: this.saveEntity },
                    React.createElement("div", null,
                        field.id ?
                            React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                                React.createElement(reactstrap_1.Label, { for: "id" },
                                    React.createElement(react_jhipster_1.Translate, { contentKey: "global.field.id" }, "ID")),
                                React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", className: "form-control", name: "id", required: true, readOnly: true }))
                            : null,
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { id: "typeLabel" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.field.type" }, "type")),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "select", className: "form-control", name: "type" },
                                React.createElement("option", { value: "TEXT" }, "TEXT"),
                                React.createElement("option", { value: "TEXTAREA" }, "TEXTAREA"),
                                React.createElement("option", { value: "SELECT" }, "SELECT"),
                                React.createElement("option", { value: "NUMBER" }, "NUMBER"),
                                React.createElement("option", { value: "RADIO" }, "RADIO"),
                                React.createElement("option", { value: "CHECKBOX" }, "CHECKBOX"))),
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            fieldOptions.map(function (fieldOption) { return (React.createElement("span", null, fieldOption.label)); }),
                            React.createElement(react_router_dom_1.Link, { to: "field-option/new", className: "btn btn-primary float-right jh-create-entity" },
                                React.createElement(fa_1.FaPlus, null),
                                " ",
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.fieldOption.home.createLabel" }))),
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { id: "titleLabel", for: "title" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.field.title" }, "title")),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", className: "form-control", name: "title", required: true }),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field is required."),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field cannot be longer than 50 characters.")),
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { id: "nameLabel", for: "name" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.field.name" }, "name")),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", className: "form-control", name: "name", required: true }),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field is required."),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field cannot be longer than 50 characters.")),
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "form.id" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.field.form" }, "Form")),
                            !this.props.match.params.formId ?
                                React.createElement(availity_reactstrap_validation_1.AvInput, { type: "select", className: "form-control", name: "form.id", onChange: this.formUpdate },
                                    React.createElement("option", { value: "", key: "0" }),
                                    forms.map(function (otherEntity) {
                                        return React.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.id);
                                    }))
                                : null,
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "number", readOnly: true, name: "form.id", value: this.state.formId }))),
                    React.createElement("div", null,
                        React.createElement(reactstrap_1.Button, { color: "secondary", onClick: this.handleClose },
                            React.createElement(fa_1.FaBan, null),
                            "\u00A0",
                            React.createElement(react_jhipster_1.Translate, { contentKey: "entity.action.cancel" }, "Cancel")),
                        React.createElement(reactstrap_1.Button, { color: "primary", type: "submit", disabled: isInvalid || updating },
                            React.createElement(fa_1.FaFloppyO, null),
                            "\u00A0",
                            React.createElement(react_jhipster_1.Translate, { contentKey: "entity.action.save" }, "Save"))))));
    };
    return FieldDialog;
}(React.Component));
exports.FieldDialog = FieldDialog;
var mapStateToProps = function (storeState) { return ({
    field: storeState.field.entity,
    forms: storeState.field.forms,
    loading: storeState.field.loading,
    updating: storeState.field.updating,
    fieldOptions: storeState.fieldOption.entities
}); };
var mapDispatchToProps = { getEntity: field_reducer_1.getEntity, updateEntity: field_reducer_1.updateEntity, createEntity: field_reducer_1.createEntity, getFieldOptions: field_option_reducer_1.getEntities };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FieldDialog);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field\\field-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field\\field-dialog.tsx"); } } })();

/***/ })

})
//# sourceMappingURL=1.9d794e1ac8fd281a0d64.hot-update.js.map