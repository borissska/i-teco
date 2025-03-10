import { FC } from 'react';
import { orderHeaders, equipmentHeaders } from './HeadersEl.constants';
import { IHeaderEl } from './HeadersEl.props';
import styles from "./HeadersEl.module.scss";

const HeadersEl: FC<IHeaderEl> = ({ element, onSort }) => {
  if (!element) {
    return null;
  }

  const headers = "orderNumber" in element ? orderHeaders : equipmentHeaders;

  return (
    <tr className={styles.header}>
      {headers.map((header) => (
        <th key={header.key} className={styles.header__el} onClick={() => header.key && onSort(header.key)}>
          {header.label}
        </th>
      ))}
    </tr>
  );
}

export default HeadersEl;
