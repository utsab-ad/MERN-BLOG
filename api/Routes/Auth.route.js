import express from "express";
import {Register, Login, GoogleLogin, Logout } from "../controllers/Auth.controller.js"; 
import {authenticate} from '../middleware/authenticate.js'

const AuthRoute = express.Router();
AuthRoute.post('/login', Login)
AuthRoute.post('/register', Register)
AuthRoute.post('/google-login', GoogleLogin)
AuthRoute.get('/logout', authenticate, Logout)


export default AuthRoute;