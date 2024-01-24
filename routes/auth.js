import { Router } from "express";
import {
    forgetPassword,
    resetPassword,
    signin,
    signup 
} from '../controllers/auth.js'
import { 
    validateUserCredentialsLogin,
    validateUserCredentialsRegister, 
    validateUserCredentialsResetPassword
} from "../middlewares/validation/authValidation.js";

export const Route = Router();

Route.post('/signup', validateUserCredentialsRegister, signup);
Route.post('/signin', validateUserCredentialsLogin, signin);
Route.post('/forget-password', forgetPassword);
Route.post('/:id/reset-password', validateUserCredentialsResetPassword, resetPassword);


