import UserService from './service';
import { NextFunction, Request, Response } from 'express';
import { IIncidentReportModel } from '../../config/models/categoriaModel';
/**
 * @export create
 * @param {Request} req requisição do corpo aceita um json com os parametros IIncidentReportModel
 * @param {Response} res A função ira retornar a mensagem "Incidente cadastrado com sucesso, caso sucedido".
 * @param {NextFunction} next 
 * @description Esta função realiza a inserção do incident no banco de dados./
 * @returns {Promise < void >} 
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise <void>{
    try {
        const newIncident: IIncidentReportModel = await UserService.createIncident(req.body);
        if(newIncident)
            res.status(200).json("Incidente cadastrado com sucesso!");
    } catch (error: any) {
        res.status(400).json(error.message);
    }
}

/**
 * @export findAll
 * @param {Request} req Neste caso não é necessario enviar nenhum corpo de requisição
 * @param {Response} res A função ira retornar todos os incidents cadastrados e o 'status' caso seja bem sucedida.
 * @param {NextFunction} next 
 * @description Esta função realiza a busca de todos os incidents registrados no banco de dados.
 * @returns {Promise < void >} 
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const incidents: IIncidentReportModel[] = await UserService.findAllIncidents();

        res.status(200).json(incidents);
    } catch (error: any) {
        res.status(400).json(error.message);
    }
}


/**
 * @export findOne
 * @param {Request} req Neste caso é necessario enviar o id do incident
 * @param {Response} res A função ira retornar apenas o  incident correspondido.
 * @param {NextFunction} next 
 * @description Esta função realiza a busca de um incident especifico registrado no banco de dados.
 * @returns {Promise < void >} 
 */
export async function findOne(req: Request, res: Response): Promise<void>{
    try {
        const incident: IIncidentReportModel = await UserService.findIncident(req.params.id);
        if(incident)
            res.status(200).json(incident)
    } catch (error: any) {
        res.status(400).json(error.message);
    }
}

/**
 * @export findCategory
 * @param {Request} req Neste caso é necessario enviar o id do incident
 * @param {Response} res A função ira retornar apenas o  incident correspondido.
 * @param {NextFunction} next 
 * @description Esta função realiza a busca de um incident especifico registrado no banco de dados.
 * @returns {Promise < void >} 
 */
export async function findCategory(req: Request, res: Response): Promise<void>{
    try {
        const incident: IIncidentReportModel[] = await UserService.findCategory(req.body);
        if(incident)
            res.status(200).json(incident)
    } catch (error: any) {
        res.status(400).json(error.message);
    }
}


/**
 * @export findAll
 * @param {Request} req Neste caso é necessario enviar o id do incident
 * @param {Response} res A função ira retornar apenas o  "OK": 1, "n":1 .
 * @param {NextFunction} next 
 * @description Esta função realiza a busca do incident registrado no banco de dados e remove-o.
 * @returns {Promise < void >} 
 */
export async function deleteOne(req: Request, res: Response): Promise<void>{
    try {
        const remove: any = await UserService.deleteIncident(req.params.id);
        if(remove)
            res.status(200).json(remove)
    } catch (error: any) {
        res.status(400).json(error.message);
    }
}