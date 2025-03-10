import { useEffect, useState } from "react";
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

  const handleStatusChange = (newStatus: EEquipmentStatus) => {
    if (!selectedElement || !isEquipmentType(selectedElement)) return;

    dispatch(updateEquipmentStatus({ id: selectedElement.id, status: newStatus }));
    setSelectedElement((prev) => {
      if (prev && isEquipmentType(prev)) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });
  };

  const handleRowClick = (element: TTableItem) => {
    setSelectedElement(element);
  };

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
        <h2>{selectedElement.name || "Оборудование"}</h2>
        <p>Текущий статус: {selectedElement.status}</p>
        <select
          onChange={(e) => handleStatusChange(e.target.value as EEquipmentStatus)}
          value={selectedElement.status}
        >
          {Object.values(EEquipmentStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </Modal>
      )}
    </>
  );
};

export default EquipmentPage;
