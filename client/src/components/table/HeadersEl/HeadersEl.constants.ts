import { Equipment } from "../../../shared/@types/equipments_type";
import { Order } from "../../../shared/@types/order_type";

export const orderHeaders: { key: keyof Order; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "orderNumber", label: "Номер заказа" },
  { key: "productName", label: "Товар" },
  { key: "quantity", label: "Количество" },
  { key: "status", label: "Статус" },
  { key: "startDate", label: "Дата заказа" },
  { key: "endDate", label: "Дата прихода" },
];

export const equipmentHeaders: { key: keyof Equipment; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Название" },
  { key: "status", label: "Статус" },
];