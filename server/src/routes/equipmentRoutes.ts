import { Router } from "express";
import { getEquipment, updateEquipmentStatus } from "../controllers/equipmentController/equipmentController";

const equipmentRouter = Router();

equipmentRouter.get("/", getEquipment);
equipmentRouter.patch("/:id", updateEquipmentStatus)

export default equipmentRouter;