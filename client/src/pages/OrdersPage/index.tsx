import { useState, useEffect, useCallback } from "react";
import ElementTable from "../../components/table/Table";
import { EOrderStatus, EStatus } from "../../shared/@types/status_type";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import Modal from "../../components/Modal";
import { TTableItem } from "../../shared/@types/mixed_type";
import styles from "./OrdersPage.module.scss";
import { isOrderType } from "./OrderPage.utils";

const OrderPage = () => {
  const { orders, order_status } = useAppSelector((state) => state.order);
  const [selectedElement, setSelectedElement] = useState<TTableItem | null>(null);
  const dispatch = useAppDispatch();

  const handleStatusChange = useCallback((newStatus: EOrderStatus) => {
    if (!selectedElement || !isOrderType(selectedElement)) return;

    dispatch(updateOrderStatus({ id: selectedElement.id, status: newStatus }));
    setSelectedElement((prev) => {
      if (prev && isOrderType(prev)) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });
  }, [selectedElement])

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleRowClick = useCallback((element: TTableItem | null) => {
    setSelectedElement(element);
  }, [])

  return (
    <>
      <h1 className={styles.name}>Заказы</h1>
      {order_status === EStatus.SUCCESS && (
        <ElementTable data={orders} onRowClick={handleRowClick} />
      )}
      {selectedElement && isOrderType(selectedElement) && (
        <Modal close={() => handleRowClick(null)}>
          <div className={styles.modalContent}>
            <h2>
              {selectedElement.productName || "Детали"}
            </h2>
            <p className={styles.modalText}>
              Текущий статус: {selectedElement.status}
            </p>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                onChange={(e) => handleStatusChange(e.target.value as EOrderStatus)}
                value={selectedElement.status}
              >
                {Object.values(EOrderStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OrderPage;
