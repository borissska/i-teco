import React from "react";
import { Order } from "../../../shared/@types/order_type";

interface IOrderBodyEl {
  order: Order;
}

const OrderBodyEl: React.FC<IOrderBodyEl> = ({ order }) => {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.orderNumber}</td>
      <td>{order.productName}</td>
      <td>{order.quantity}</td>
      <td>{order.status}</td>
      <td>{order.startDate}</td>
      <td>{order.endDate}</td>
    </tr>
  );
};

export default OrderBodyEl;
