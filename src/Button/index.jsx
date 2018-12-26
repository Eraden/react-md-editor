import React      from "react";
import classNames from "classnames";

import * as Icons from "./icons";
import Icon       from "../Icon";

import * as styles from "./styles.modules.css";

const Button = ({ formatKey, label, action, pressed }) => {
    const isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3');
    return (
        <button
            className={classNames(
                styles.toolbarButton,
                `MDEditor_toolbarButton--${formatKey}`,
                pressed ? styles.pressed : null,
            )}
            onClick={action}
            title={formatKey}
        >
            {
                isTextIcon ? null : <Icon icon={Icons[formatKey]}/>
            }
            <span className={classNames(
                isTextIcon
                    ? styles.labelIcon
                    : styles.label
            )}>
                {label}
            </span>
        </button>
    );
};

export default Button;
