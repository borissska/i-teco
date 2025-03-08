import { Request, Response } from "express";
import { Order, orderSchema } from "../../entities/order/schema";
import { readFile, writeFile } from "fs/promises";
import { ZodError } from "zod";
import path from "path";

const filePath = path.join(__dirname, "../../entities/order/data.json");

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const fileData = await readFile(filePath, "utf-8");
    const orders = JSON.parse(fileData);

    const validatedOrders: Order[] = orders.map((order: Order) => orderSchema.parse(order));

    res.status(200).json({
      success: true,
      orders: validatedOrders,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: err.format(),
      });
    } else {
      res.status(500).json({ success: false, message: "Серверная ошибка" });
    }
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = Number(req.params.id);

    const fileData = await readFile(filePath, "utf-8");
    const orders: Order[] = JSON.parse(fileData);

    const order: Order | undefined = orders.find((order: Order) => order.id === orderId);

    if (!order) {
      res.status(404).json({ success: false, message: "Заказ не найден" });
      return;
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({
        success: false,
        errors: err.format(),
      });
    } else {
      res.status(500).json({ success: false, message: "Серверная ошибка" });
    }
  }
};
