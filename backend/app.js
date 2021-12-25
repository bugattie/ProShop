import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
