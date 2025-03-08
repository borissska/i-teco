import React from "react";
import { getEquipment } from "../../../redux/slices/equipmentSlice";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { EStatus } from "../../../shared/@types/status_type";

const EquipmentList: React.FC = () => {
  const { equipment, status } = useAppSelector((state) => state.equipment);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getEquipment());
  }, []);

  return (
    <div>
      {status === EStatus.SUCCESS ? equipment.map((el) => <div key={el.id}>{el.name}</div>) : "Loading..."}
    </div>
  );
};

export default EquipmentList;
