import UserService from './service';
import { NextFunction, Request, Response } from 'express';
import { IIncidentReportModel } from '../../config/models/categoriaModel';


export async function findAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        const incidents: IIncidentReportModel[] = await UserService.findAllIncidents();

        res.status(200).json(incidents);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise <void>{
    try {
        const newIncident: IIncidentReportModel = await UserService.createIncident(req.body);
        if(newIncident)
            res.status(200).json("Incidente cadastrado com sucesso!");
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function findOne(req: Request, res: Response): Promise<void>{
    try {
        const incident: IIncidentReportModel = await UserService.findIncident(req.params.id);
        if(incident)
            res.status(200).json(incident)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export async function deleteOne(req: Request, res: Response): Promise<void>{
    try {
        const remove: any = await UserService.deleteIncident(req.params.id);
        if(remove)
            res.status(200).json(remove)
    } catch (error) {
        res.status(400).json(error.message);
    }
}