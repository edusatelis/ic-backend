import express from 'express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import * as jwtConfig from './../config/middlewares/jwt';

export function init(app: express.Application): void {

    const router: express.Router = express.Router();

    /**
     * @description Todas as rotas autenticadas
     */
    app.use('/v1/users', jwtConfig.isAuthenticated, UserRouter);

 
    

    /**
     * @description Todas as rotas sem autenticação
     * @constructs
     */
    app.use('/auth', AuthRouter);

    
    
    /**
     * @constructs all routes
     */
    app.use(router);
}