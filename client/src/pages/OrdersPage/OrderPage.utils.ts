import { TTableItem } from "../../shared/@types/mixed_type";
import { Order } from "../../shared/@types/order_type";

export const isOrderType = (element: TTableItem): element is Order => {
  return "orderNumber" in element;
}