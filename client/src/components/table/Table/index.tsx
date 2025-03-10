import { useState, FC, useEffect, useCallback } from "react";
import TableBodyEl from "../BodyEl";
import styles from "./Table.module.scss";
import { Order } from "../../../shared/@types/order_type";
import HeadersEl from "../HeadersEl";
import { Equipment } from "../../../shared/@types/equipments_type";
import { IElementsTable } from "./Table.props";
import { TTableItem } from "../../../shared/@types/mixed_type";
import { elementsPerPage } from "./Table.constants";
import { isOrderType } from "../../../pages/OrdersPage/OrderPage.utils";
import { isEquipmentType } from "../../../pages/EquipmentPage/EquipmentPage.utils";

const Table: FC<IElementsTable> = ({ data, onRowClick }) => {
  const [filteredElements, setFilteredElements] = useState<TTableItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Order | keyof Equipment | null>(null);
  const [sortElement, setSortElement] = useState<"asc" | "desc">("asc");

  const totalPages = Math.ceil(filteredElements.length / elementsPerPage);
  const currentElements = filteredElements.slice(
    (currentPage - 1) * elementsPerPage,
    currentPage * elementsPerPage
  );

  const handleSort = useCallback((field: keyof Equipment | keyof Order) => {
    if (sortField === field) {
      setSortElement(sortElement === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortElement("asc");
    }
  }, [sortField])

  useEffect(() => {
    let updatedElements: TTableItem[] = [...data];

    if (statusFilter) {
      updatedElements = updatedElements.filter((element) => element.status === statusFilter);
    }

    if (sortField) {
      updatedElements.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] as string | number;
        const bValue = b[sortField as keyof typeof b] as string | number;

        if (aValue < bValue) return sortElement === "asc" ? -1 : 1;
        if (aValue > bValue) return sortElement === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredElements(updatedElements);
    setCurrentPage(1);
  }, [statusFilter, sortField, sortElement, data]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.filter}>
        <label className={styles.filter__label}>Фильтр:</label>
        <select className={styles.filter__select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Все</option>
          {isOrderType(data[0]) && (
            <>
              <option value="В процессе">В процессе</option>
              <option value="Завершено">Завершено</option>
              <option value="Отклонено">Отклонено</option>
            </>
          )}
          {isEquipmentType(data[0]) && (
            <>
              <option value="Работает">Работает</option>
              <option value="Остановлено">Остановлено</option>
              <option value="Техническое обслуживание">Техническое обслуживание</option>
            </>
          )}
        </select>
      </div>

      <table className={styles.table_container}>
        <thead className={styles.table_container__header}>
          {currentElements.length > 0 ? (
            <HeadersEl element={currentElements[0]} onSort={handleSort} />
          ) : (
            <tr>
              <th>Нет данных</th>
            </tr>
          )}
        </thead>
        <tbody className={styles.table_container__body}>
          {currentElements.length > 0 ? (
            currentElements.map((el) => (
              <TableBodyEl key={el.id} element={el} onRowClick={onRowClick} />
            ))
          ) : (
            <tr>
              <td colSpan={10} className={styles.noData}>
                Нет доступных данных
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? styles.active : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Table;
