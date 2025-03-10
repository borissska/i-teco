import { Router } from "express";
import { getOrders, updateOrderStatus } from "../controllers/orderController/orderController";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.patch("/:id", updateOrderStatus)

export default orderRouter;