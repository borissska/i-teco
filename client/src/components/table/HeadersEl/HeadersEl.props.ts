import { Equipment } from "../../../shared/@types/equipments_type";
import { TTableItem } from "../../../shared/@types/mixed_type";
import { Order } from "../../../shared/@types/order_type";

export interface IHeaderEl {
  element: TTableItem;
  onSort: (field: keyof Order | keyof Equipment) => void;
}