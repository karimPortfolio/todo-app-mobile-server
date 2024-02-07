import { Router } from "express";
import { createTask } from "../controllers/tasks.js";

export const Route = Router();

Route.post('/:id/store', createTask);