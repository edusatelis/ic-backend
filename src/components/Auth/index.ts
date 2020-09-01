import * as jwt from 'jsonwebtoken';
import express from 'express';
import { NextFunction, Request, Response } from 'express';
import AuthService from './service';
const app: express.Application = express();
// import * as httpStatus from 'http-status';
// import HttpError from './../../config/error/sendError';
import { IUserModel } from '../User/model';
// import { emailValidation } from '../Email';



/**
 * @export signup
 * @param {Request} req Dados do usuário no auto cadastro.
 * @param {Response} res A função ira retornar um objeto que contém a mensagem “Cadastrado com Sucesso!”
 * e o 'status' caso seja bem sucedida.
 * @param {NextFunction} next 
 * @description Esta função realiza o auto cadastro dos usuário no banco de dados através dos parãmetros recebidos.
 * @returns {Promise < void >} 
 */
export async function signup(req: Request, res: Response, next: NextFunction): Promise < void > {
    
    try {
        // Verifica se o usuario está validando de acordo com o modelo
        const user: IUserModel = await AuthService.createUser(req.body);

        // Retorno caso a função seja sucedida.
        res.status(200).json('Cadatrado com Sucesso!');

    } catch (error) { // Retorno caso falhe a função.

        res.status(400).json(error.message);
    }
}

/**
 * @export login
 * @param {Request} req Paramêtro que recebe o email e a senha do usuário no 'login'.
 * @param {Response} res A função ira retornar um objeto que contém a mensagem “Login realizado com sucesso”
 * e o 'status' caso seja bem sucedida.
 * @param {NextFunction} next
 * @description A função realiza a validação dos campos(email e senha) preenchidos pelo usuario. 
 * Em seguida, gera um token valido por 4 (quatro) horas.
 * @returns {Promise < void >} Retorna ao o usuário a mensagem "Login realizado com sucesso"
 * e o 'status', permitindo o acesso do usuário ao sistema.
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {

    try {
        // Validando os campos do corpo da requisição. 
        const user: IUserModel = await AuthService.login(req.body);

        // Gerando token valido por 4 horas.
        const token: string = jwt.sign({ email: user.email }, app.get('secret'), {
            expiresIn: '4h'
        });

        // Corpo devolvido caso a requisição sejá bem sucedida.
        res.status(200).json({ logged: true, message: 'Login realizado com sucesso',  token});


    } catch (error) { // Retorno caso falhe a função.

        res.status(400).json(error.message);

    }
}