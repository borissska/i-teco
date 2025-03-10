import { Equipment } from "../../shared/@types/equipments_type";
import { TTableItem } from "../../shared/@types/mixed_type";

export const isEquipmentType = (element: TTableItem): element is Equipment => {
  return "name" in element;
}