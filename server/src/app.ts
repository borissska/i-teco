import express, { Express } from "express";
import cors from "cors";
import orderRouter from "./routes/orderRoutes";
import equipmentRouter from "./routes/equipmentRoutes";

const app: Express = express();

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
}));

app.use(express.json());
app.use("/orders", orderRouter);
app.use("/equipment", equipmentRouter);

export default app;
