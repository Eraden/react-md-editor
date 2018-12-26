import React from "react";

const Icon = ({ icon }) =>
    <span dangerouslySetInnerHTML={{ __html: icon }} className="MDEditor_toolbarButton_icon"/>;

export default Icon;
