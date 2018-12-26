"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Icon = function (_a) {
    var icon = _a.icon;
    return react_1["default"].createElement("span", { dangerouslySetInnerHTML: { __html: icon }, className: "MDEditor_toolbarButton_icon" });
};
exports["default"] = Icon;
