import express, { Express, Request, Response } from "express";
import { routes } from "./routes";
import { Materials } from "./datastore/materials";

export const datastore = new Materials();

export const app: Express = express();

app.use(express.json());

// routes
app.use("/api", routes);
