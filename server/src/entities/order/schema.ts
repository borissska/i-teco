import { z } from "zod";

const messages = {
    min4: "Номер заказа должен содержать минимум 4 символа",
    ORD: "Заказ должен начинаться с \"ORD\"",
}

export const orderSchema = z.object({
  id: z.number().int().positive(),
  orderNumber: z.string().min(4, { message: messages.min4 }).startsWith("ORD", { message: messages.ORD }),
  productName: z.string(),
  quantity: z.number(),
  status: z.enum(["В процессе", "Завершено", "Отклонено"]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export type Order = z.infer<typeof orderSchema>;
