import { Router } from "express";
import { 
    createTask,
    deleteTask,
    getTasks,
    taskCompleted,
    updateTask,
} from "../controllers/tasks.js";
import { Auth } from "../middlewares/auth.js";

export const Route = Router();

Route.get('/:id', Auth, getTasks);
Route.post('/:id/store', Auth, createTask);
Route.put('/:id/update', Auth, updateTask);
Route.put('/:id/completed', Auth, taskCompleted);
Route.delete('/:id/destroy', Auth, deleteTask);
