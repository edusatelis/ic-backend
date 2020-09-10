import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface RequestWithUser extends Request {
    user: object | string;
}

export function isAuthenticated(req: RequestWithUser, res: any, next: any): void {
    const token: any = req.headers['authorization'];
    if (token) {
        try {
            const user: object | string = jwt.verify(token, `${process.env.SECRET}`);
            req.user = user;

            return next();

        } catch (error) {
           return  res.status(401).json("Não Autorizado");
            
        }
    }
   return  res.status(400).json('o token não foi informado');
}