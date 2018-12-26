"use strict";
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var Icons = require("./icons");
var Icon_1 = require("./Icon");
var Button = function (_a) {
    var formatKey = _a.formatKey, label = _a.label, action = _a.action, pressed = _a.pressed;
    var isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3');
    return (react_1["default"].createElement("button", { className: classnames_1["default"]('MDEditor_toolbarButton', "MDEditor_toolbarButton--" + formatKey, pressed ? 'MDEditor_toolbarButton--pressed' : null), onClick: action, title: formatKey },
        isTextIcon ? null : react_1["default"].createElement(Icon_1["default"], { icon: Icons[formatKey] }),
        react_1["default"].createElement("span", { className: classnames_1["default"](isTextIcon ? 'MDEditor_toolbarButton_label-icon' : 'MDEditor_toolbarButton_label') }, label)));
};
exports["default"] = Button;
