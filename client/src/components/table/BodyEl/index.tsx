import React from "react";
import styles from "./BodyEl.module.scss";
import classNames from "classnames";
import { statusClassMap } from "./BodyEl.constants";
import { IBodyEl } from "./BodyEl.props";

const BodyEl: React.FC<IBodyEl> = ({ element, onRowClick }) => {
  return (
    <tr className={styles.trow} onClick={() => onRowClick(element)}>
      {Object.entries(element).map(([key, value]) => {
        if (key === "status") {
          return (
            <td className={classNames(styles.trow__td, styles.status, statusClassMap[value])} key={key}>
              {value}
            </td>
          );
        }
        return <td className={styles.trow__td} key={key}>{value}</td>;
        })}
    </tr>
  );
};

export default BodyEl;
