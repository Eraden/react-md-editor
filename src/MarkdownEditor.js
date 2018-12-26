"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_dom_1 = require("react-dom");
var react_1 = require("react");
var codemirror_1 = require("codemirror");
var classnames_1 = require("classnames");
var PropTypes = require("prop-types");
require("codemirror/mode/xml/xml");
require("codemirror/mode/markdown/markdown");
require("codemirror/addon/edit/continuelist");
var Button_1 = require("./Button");
var format_js_1 = require("./format.js");
var toggleFormat = function (codeMirror, formatKey, event) {
    event.preventDefault();
    format_js_1.applyFormat(codeMirror, formatKey);
};
var MarkdownEditor = /** @class */ (function (_super) {
    __extends(MarkdownEditor, _super);
    function MarkdownEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focus = function () { return _this.codeMirror ? _this.codeMirror.focus() : null; };
        _this.setFocusOn = function () { return _this.setState({ isFocused: true }); };
        _this.setFocusOff = function () { return _this.setState({ isFocused: false }); };
        _this.updateCursorState = function () { return _this.setState({ cs: format_js_1.getCursorState(_this.codeMirror) }); };
        _this.codeMirrorValueChanged = function (doc) {
            var newValue = doc.getValue();
            _this.currentCodeMirrorValue = newValue;
            _this.props.onChange && _this.props.onChange(newValue);
        };
        _this.toggleH1 = function (event) { return toggleFormat(_this.codeMirror, 'h1', event); };
        _this.toggleH2 = function (event) { return toggleFormat(_this.codeMirror, 'h2', event); };
        _this.toggleH3 = function (event) { return toggleFormat(_this.codeMirror, 'h3', event); };
        _this.toggleBold = function (event) { return toggleFormat(_this.codeMirror, 'bold', event); };
        _this.toggleItalic = function (event) { return toggleFormat(_this.codeMirror, 'italic', event); };
        _this.toggleOList = function (event) { return toggleFormat(_this.codeMirror, 'oList', event); };
        _this.toggleUList = function (event) { return toggleFormat(_this.codeMirror, 'uList', event); };
        _this.toggleQuote = function (event) { return toggleFormat(_this.codeMirror, 'quote', event); };
        _this.bindElement = function (codeMirrorElement) { return _this.codeMirrorElement = codeMirrorElement; };
        return _this;
    }
    MarkdownEditor.propTypes = function () {
        return {
            onChange: PropTypes.func,
            options: PropTypes.object,
            path: PropTypes.string,
            value: PropTypes.string
        };
    };
    MarkdownEditor.prototype.componentDidMount = function () {
        this.codeMirror = codemirror_1["default"].fromTextArea(react_dom_1["default"].findDOMNode(this.codeMirrorElement), __assign({ mode: 'markdown', lineNumbers: false, indentWithTabs: true, tabSize: '2' }, this.props.options));
        this.codeMirror.on('change', this.codeMirrorValueChanged);
        this.codeMirror.on('focus', this.setFocusOn);
        this.codeMirror.on('blur', this.setFocusOff);
        this.codeMirror.on('cursorActivity', this.updateCursorState);
        this.currentCodeMirrorValue = this.props.value || "";
    };
    MarkdownEditor.prototype.componentWillUnmount = function () {
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    };
    MarkdownEditor.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.codeMirror && this.currentCodeMirrorValue !== nextProps.value) {
            this.codeMirror.setValue(nextProps.value);
        }
    };
    MarkdownEditor.prototype.render = function () {
        var editorClassName = classnames_1["default"]('MDEditor_editor', { 'MDEditor_editor--focused': this.state.isFocused });
        var _a = this.props, path = _a.path, value = _a.value;
        return (react_1["default"].createElement("div", { className: "MDEditor" },
            react_1["default"].createElement("div", { className: "MDEditor_toolbar" },
                react_1["default"].createElement(Button_1["default"], { formatKey: 'h1', label: 'h1', action: this.toggleH1, pressed: this.state.cs.h1 }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'h2', label: 'h2', action: this.toggleH2, pressed: this.state.cs.h2 }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'h3', label: 'h3', action: this.toggleH3, pressed: this.state.cs.h3 }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'bold', label: 'b', action: this.toggleBold, pressed: this.state.cs.bold }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'italic', label: 'i', action: this.toggleItalic, pressed: this.state.cs.italic }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'oList', label: 'ol', action: this.toggleOList, pressed: this.state.cs.oList }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'uList', label: 'ul', action: this.toggleUList, pressed: this.state.cs.uList }),
                react_1["default"].createElement(Button_1["default"], { formatKey: 'quote', label: 'q', action: this.toggleQuote, pressed: this.state.cs.quote })),
            react_1["default"].createElement("div", { className: editorClassName },
                react_1["default"].createElement("textarea", { ref: this.bindElement, name: path, defaultValue: value, autoComplete: "off" }))));
    };
    return MarkdownEditor;
}(react_1["default"].Component));
exports.MarkdownEditor = MarkdownEditor;
exports["default"] = MarkdownEditor;
