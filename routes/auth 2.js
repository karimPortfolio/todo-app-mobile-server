import { Router } from "express";
import { signin, signup } from '../controllers/auth.js'

export const Route = Router();

Route.post('/signup', signup);
Route.post('/signin', signin);


