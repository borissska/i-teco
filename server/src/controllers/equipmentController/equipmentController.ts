import { Request, Response } from "express";
import { Equipment, equipmentSchema } from "../../entities/equipment/schema";
import { readFile } from "fs/promises";
import { ZodError } from "zod";
import path from "path";

const filePath = path.join(__dirname, "../../entities/equipment/data.json");

export const getEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const fileData = await readFile(filePath, "utf-8");
    const equipments = JSON.parse(fileData);

    const validatedEquipments: Equipment[] = equipments.map((equipment: Equipment) => equipmentSchema.parse(equipment));

    res.status(200).json({
      success: true,
      equipments: validatedEquipments,
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

export const updateEquipment = async (req: Request, res: Response): Promise<void> => {
  try {
    const equipmentId = Number(req.params.id);

    const fileData = await readFile(filePath, "utf-8");
    const equipments: Equipment[] = JSON.parse(fileData);
    
    const equipment: Equipment | undefined = equipments.find((equipment: Equipment) => equipment.id === equipmentId);

    if (!equipment) {
      res.status(404).json({ success: false, message: "Оборудование не найдено" });
      return;
    } 

    res.status(200).json({ success: true, equipment });
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
