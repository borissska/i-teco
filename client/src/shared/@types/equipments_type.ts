import { z } from "zod";
import { EStatus } from "./status_type";

const messages = {
    enum: "Оборудование может работать или быть остановлено"
}

export const equipmentSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  status: z.enum(["Работает", "Остановлено"], { message: messages.enum }),
});

export type Equipment = z.infer<typeof equipmentSchema>;

export interface IEquipment {
    equipment: Equipment[];
    status: EStatus;
}