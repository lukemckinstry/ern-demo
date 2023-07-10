import express from "express";
import { materialsRoutes } from "./materials";

export const routes = express.Router();

routes.use("/materials", materialsRoutes);
