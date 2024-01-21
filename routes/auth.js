import { Router } from "express";
import { signin, signup } from '../controllers/auth.js'
import { 
    validateUserCredentialsLogin,
    validateUserCredentialsRegister 
} from "../middlewares/validation/authValidation.js";

export const Route = Router();

Route.post('/signup', validateUserCredentialsRegister, signup);
Route.post('/signin', validateUserCredentialsLogin, signin);


