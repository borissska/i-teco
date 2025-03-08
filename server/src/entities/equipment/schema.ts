import { z } from "zod";

const messages = {
    enum: "Оборудование может работать, быть на обслуживании или быть остановлено"
}

export const equipmentSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  status: z.enum(["Работает", "Остановлено", "Техническое обслуживание"], { message: messages.enum }),
});

export type Equipment = z.infer<typeof equipmentSchema>;