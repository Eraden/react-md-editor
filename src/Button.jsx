import React      from "react";
import classNames from "classnames";

import * as Icons from "./icons";
import Icon       from "./Icon";

const Button = ({ formatKey, label, action, pressed }) => {
    const isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3');
    return (
        <button
            className={classNames(
                'MDEditor_toolbarButton',
                `MDEditor_toolbarButton--${formatKey}`,
                pressed ? 'MDEditor_toolbarButton--pressed' : null,
            )}
            onClick={action}
            title={formatKey}
        >
            {
                isTextIcon ? null : <Icon icon={Icons[formatKey]}/>
            }
            <span className={classNames(
                isTextIcon ? 'MDEditor_toolbarButton_label-icon' : 'MDEditor_toolbarButton_label'
            )}>
                {label}
            </span>
        </button>
    );
};

export default Button;
