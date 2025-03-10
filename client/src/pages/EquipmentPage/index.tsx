import { useCallback, useEffect, useState } from "react";
import ElementTable from "../../components/table/Table";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { EEquipmentStatus, EStatus } from "../../shared/@types/status_type";
import { getEquipment, updateEquipmentStatus } from "../../redux/slices/equipmentSlice";
import Modal from "../../components/Modal";
import { TTableItem } from "../../shared/@types/mixed_type";
import styles from "./EquipmentPage.module.scss";
import { isEquipmentType } from "./EquipmentPage.utils";

const EquipmentPage = () => {
  const { equipment, equipment_status } = useAppSelector((state) => state.equipment);
  const [selectedElement, setSelectedElement] = useState<TTableItem | null>(null);
  const dispatch = useAppDispatch();

  const handleStatusChange = useCallback((newStatus: EEquipmentStatus) => {
    if (!selectedElement || !isEquipmentType(selectedElement)) return;

    dispatch(updateEquipmentStatus({ id: selectedElement.id, status: newStatus }));
    setSelectedElement((prev) => {
      if (prev && isEquipmentType(prev)) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });
  }, [selectedElement])

  const handleRowClick = useCallback((element: TTableItem) => {
      setSelectedElement(element);
    }, [])

  useEffect(() => {
    dispatch(getEquipment());
  }, []);

  return (
    <>
      <h1 className={styles.name}>Оборудование</h1>
      {equipment_status === EStatus.SUCCESS && (
        <ElementTable data={equipment} onRowClick={handleRowClick} />
      )}
      {selectedElement && isEquipmentType(selectedElement) && (
        <Modal close={() => setSelectedElement(null)}>
        <div className={styles.modalContent}>
          <h2>
            {selectedElement.name || "Детали"}
          </h2>
          <p className={styles.modalText}>
            Текущий статус: {selectedElement.status}
          </p>
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              onChange={(e) => handleStatusChange(e.target.value as EEquipmentStatus)}
              value={selectedElement.status}
            >
              {Object.values(EEquipmentStatus).map((status) => (
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

export default EquipmentPage;
