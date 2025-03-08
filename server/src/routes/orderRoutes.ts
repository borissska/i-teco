import { Router } from "express";
import { updateOrder, getOrders } from "../controllers/orderController/orderController";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.put("/:id", updateOrder)

export default orderRouter;