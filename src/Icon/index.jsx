import React from "react";

import * as styles from "./styles.modules.css";

const Icon = ({ icon }) =>
    <span
        dangerouslySetInnerHTML={{ __html: icon }}
        className={styles.icon}
    />;

export default Icon;
