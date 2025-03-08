import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { EStatus } from "../../../shared/@types/status_type";
import { getOrders } from "../../../redux/slices/orderSlice";
import OrderBodyEl from "../OrderBodyEl";
import styles from "./OrderList.module.scss";
import { Order } from "../../../shared/@types/order_type";

const OrderList: React.FC = () => {
  const { orders, status } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof Order | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  React.useEffect(() => {
    let updatedOrders = [...orders];

    if (statusFilter) {
      updatedOrders = updatedOrders.filter((order) => order.status === statusFilter);
    }

    if (sortField) {
      updatedOrders.sort((a, b) => {
        const aValue = a[sortField] as string | number;
        const bValue = b[sortField] as string | number;

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredOrders(updatedOrders);
    setCurrentPage(1); // Сброс на первую страницу
  }, [statusFilter, sortField, sortOrder, orders]);

  React.useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      <h1>Заказы</h1>
      <label>Фильтр по статусу: </label>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">Все</option>
        <option value="В процессе">В процессе</option>
        <option value="Завершено">Завершено</option>
        <option value="Отклонено">Отклонено</option>
      </select>
      <table className={styles.table_container}>
        <thead className={styles.table_container__header}>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("orderNumber")}>Номер заказа</th>
            <th onClick={() => handleSort("orderNumber")}>Товар</th>
            <th onClick={() => handleSort("quantity")}>Количество</th>
            <th>Статус</th>
            <th onClick={() => handleSort("startDate")}>Дата заказа</th>
            <th onClick={() => handleSort("endDate")}>Дата прихода</th>
          </tr>
        </thead>
        <tbody className={styles.table_container__body}>
          {status === EStatus.SUCCESS
            ? currentOrders.map((el) => <OrderBodyEl key={el.id} order={el} />)
            : "Loading..."}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
