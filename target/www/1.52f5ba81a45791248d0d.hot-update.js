webpackHotUpdate(1,{

/***/ "./src/main/webapp/app/entities/field-option/field-option-dialog.tsx":
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
var reactstrap_1 = __webpack_require__("./node_modules/reactstrap/dist/reactstrap.es.js");
var availity_reactstrap_validation_1 = __webpack_require__("./node_modules/availity-reactstrap-validation/lib/index.js");
var react_jhipster_1 = __webpack_require__("./node_modules/react-jhipster/bundles/react-jhipster.umd.js");
var fa_1 = __webpack_require__("./node_modules/react-icons/lib/fa/index.js");
var field_option_reducer_1 = __webpack_require__("./src/main/webapp/app/entities/field-option/field-option.reducer.ts");
var FieldOptionDialog = /** @class */ (function (_super) {
    __extends(FieldOptionDialog, _super);
    function FieldOptionDialog(props) {
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
            if (!_this.state.fieldId) {
                _this.props.history.push('/field-option');
            }
            else {
                _this.props.history.push("/form/" + _this.state.formId + "/field/" + _this.state.fieldId + "/edit");
            }
        };
        _this.fieldUpdate = function (element) {
            var id = element.target.value;
            for (var i in _this.props.fields) {
                if (id.toString() === _this.props.fields[i].id.toString()) {
                    _this.setState({
                        fieldId: _this.props.fields[i].id
                    });
                }
            }
        };
        _this.state = {
            isNew: !_this.props.match.params || !_this.props.match.params.id,
            fieldId: 0,
            formId: 0,
            showModal: true
        };
        return _this;
    }
    FieldOptionDialog.prototype.componentDidMount = function () {
        !this.state.isNew && this.props.getEntity(this.props.match.params.id);
        if (this.props.match.params.fieldId) {
            this.setState({
                fieldId: +this.props.match.params.fieldId,
                formId: +this.props.match.params.formId
            });
        }
    };
    FieldOptionDialog.prototype.render = function () {
        var isInvalid = false;
        var _a = this.props, fieldOption = _a.fieldOption, fields = _a.fields, loading = _a.loading, updating = _a.updating;
        var _b = this.state, showModal = _b.showModal, isNew = _b.isNew;
        return (React.createElement(reactstrap_1.Modal, { isOpen: showModal, modalTransition: { timeout: 20 }, backdropTransition: { timeout: 10 }, toggle: this.handleClose, size: "lg" },
            React.createElement(reactstrap_1.ModalHeader, { toggle: this.handleClose },
                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.fieldOption.home.createOrEditLabel" }, "Create or edit a FieldOption")),
            loading ? React.createElement("p", null, "Loading...")
                : React.createElement(availity_reactstrap_validation_1.AvForm, { model: isNew ? {} : fieldOption, onSubmit: this.saveEntity },
                    React.createElement(reactstrap_1.ModalBody, null,
                        fieldOption.id ?
                            React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                                React.createElement(reactstrap_1.Label, { for: "id" },
                                    React.createElement(react_jhipster_1.Translate, { contentKey: "global.field.id" }, "ID")),
                                React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", className: "form-control", name: "id", required: true, readOnly: true }))
                            : null,
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { id: "valueLabel", for: "value" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.fieldOption.value" }, "value")),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", className: "form-control", name: "value", required: true }),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field is required."),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field cannot be longer than 50 characters.")),
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { id: "labelLabel", for: "label" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.fieldOption.label" }, "label")),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", className: "form-control", name: "label", required: true }),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field is required."),
                            React.createElement(availity_reactstrap_validation_1.AvFeedback, null, "This field cannot be longer than 50 characters.")),
                        React.createElement(availity_reactstrap_validation_1.AvGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "field.id" },
                                React.createElement(react_jhipster_1.Translate, { contentKey: "reactsterApp.fieldOption.field" }, "Field")),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "select", className: "form-control", name: "field.id", onChange: this.fieldUpdate },
                                React.createElement("option", { value: "", key: "0" }),
                                fields.map(function (otherEntity) {
                                    return React.createElement("option", { value: otherEntity.id, key: otherEntity.id }, otherEntity.id);
                                })),
                            React.createElement(availity_reactstrap_validation_1.AvInput, { type: "text", name: "field.id", value: this.state.fieldId }))),
                    React.createElement(reactstrap_1.ModalFooter, null,
                        React.createElement(reactstrap_1.Button, { color: "secondary", onClick: this.handleClose },
                            React.createElement(fa_1.FaBan, null),
                            "\u00A0",
                            React.createElement(react_jhipster_1.Translate, { contentKey: "entity.action.cancel" }, "Cancel")),
                        React.createElement(reactstrap_1.Button, { color: "primary", type: "submit", disabled: isInvalid || updating },
                            React.createElement(fa_1.FaFloppyO, null),
                            "\u00A0",
                            React.createElement(react_jhipster_1.Translate, { contentKey: "entity.action.save" }, "Save"))))));
    };
    return FieldOptionDialog;
}(React.Component));
exports.FieldOptionDialog = FieldOptionDialog;
var mapStateToProps = function (storeState) { return ({
    fieldOption: storeState.fieldOption.entity,
    fields: storeState.fieldOption.fields,
    loading: storeState.fieldOption.loading,
    updating: storeState.fieldOption.updating
}); };
var mapDispatchToProps = { getEntity: field_option_reducer_1.getEntity, updateEntity: field_option_reducer_1.updateEntity, createEntity: field_option_reducer_1.createEntity };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FieldOptionDialog);


 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field-option\\field-option-dialog.tsx"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "D:\\my docs\\dev\\reactster\\src\\main\\webapp\\app\\entities\\field-option\\field-option-dialog.tsx"); } } })();

/***/ })

})
//# sourceMappingURL=1.52f5ba81a45791248d0d.hot-update.js.map