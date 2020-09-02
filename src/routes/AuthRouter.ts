import express from 'express';
import * as AuthService from '../components/Auth/index';
const AuthRouter: express.Router = express.Router();


AuthRouter.post('/signup', AuthService.signup);



export default AuthRouter;
