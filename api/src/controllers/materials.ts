import { Request, Response } from "express";
import { datastore } from "../app";
import { v4 as uuidv4 } from "uuid";

export const listMaterials = async (req: Request, res: Response) => {
  try {
    const materials = datastore.list();
    res.json(materials);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const material = { ...req.body, id: uuidv4() };
    const newMaterial = datastore.create(material);
    res.json(newMaterial);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const id = datastore.delete(req.params.recordId);
    res.json(id);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const id = datastore.update(req.body);
    res.json(id);
  } catch (err) {
    res.status(500).send(err);
  }
};
