import React from "react";
import styles from "./index.module.scss";

const Input = ({ extra, onExtraClick, ...rest }) => {
  return (
    <div className={styles.root}>
      <input  type="text" className="input" {...rest} />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  );
};

export default Input;
