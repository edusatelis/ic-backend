import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import AuthService from './service';
import { IUserModel } from '../User/model';



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
        const user:any = await AuthService.createUser(req.body);
        // Retorno caso a função seja sucedida.
        if(user)
            res.status(200).json('Cadatrado com Sucesso!');

    } catch (error: any) { // Retorno caso falhe a função.

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
 * Em seguida, gera um token valido por 1 (uma) hora.
 * @returns {Promise < void >} Retorna ao o usuário a mensagem "Login realizado com sucesso"
 * e o 'status', permitindo o acesso do usuário ao sistema.
 */
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {

    try {
       
        // Validando os campos do corpo da requisição. 
        const user: IUserModel = await AuthService.getUser(req.body);

        // Gerando token valido por 1 hora.
        const token: string = jwt.sign({ email: user.email }, `${process.env.SECRET}`, {
            expiresIn: '60m'
        });
        // Corpo devolvido caso a requisição sejá bem sucedida.
        if(user)
             res.status(200).json({ logged: true, message: 'Login realizado com sucesso',  token});


    } catch (error: any) { // Retorno caso falhe a função.

        res.status(400).json(error.message);

    }
}