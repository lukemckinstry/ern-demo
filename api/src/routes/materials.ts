import { Router } from "express";
import {
  listMaterials,
  createMaterial,
  deleteMaterial,
  updateMaterial,
} from "../controllers/materials";

export const materialsRoutes = Router();

materialsRoutes.get("/", listMaterials);
materialsRoutes.post("/", createMaterial);
materialsRoutes.delete("/:recordId", deleteMaterial);
materialsRoutes.put("/", updateMaterial);
