import { Request, Response } from "express";
import { Equipment, equipmentSchema } from "../../entities/equipment/schema";
import { readFile, writeFile } from "fs/promises";
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


export const updateEquipmentStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const equipmentId = Number(req.params.id);
    const { status } = req.body;

    const fileData = await readFile(filePath, "utf-8");
    const equipments: Equipment[] = JSON.parse(fileData);

    const equipmentIndex = equipments.findIndex((equipment) => equipment.id === equipmentId);
    if (equipmentIndex === -1) {
      res.status(404).json({ success: false, message: "Заказ не найден" });
      return;
    }

    equipments[equipmentIndex].status = status;
    await writeFile(filePath, JSON.stringify(equipments, null, 2));

    res.status(200).json({ success: true, equipment: equipments[equipmentIndex] });
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
