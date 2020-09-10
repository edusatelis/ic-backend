import express from 'express';
import * as UserService from '../components/User';
const UserRouter: express.Router = express.Router();

UserRouter.get('/incidents', UserService.findAll);
UserRouter.get('/incidents/:id', UserService.findOne);
UserRouter.delete('/incidents/:id', UserService.deleteOne);
UserRouter.post('/incidents/new', UserService.create);

export default UserRouter; 