import { Router } from "express";
import { getEquipment, updateEquipment } from "../controllers/equipmentController/equipmentController";

const equipmentRouter = Router();

equipmentRouter.get("/", getEquipment);
equipmentRouter.put("/:id", updateEquipment)

export default equipmentRouter;