import bcryptjs from 'bcryptjs';
import UserModel, { IUserModel } from "../User/model";
import { IUserService } from "./interface";
import IncidentReportModel, { IIncidentReportModel } from '../../config/models/categoriaModel';
let validarcpf = require('validar-cpf');

const UserService: IUserService = {
    async findAllIncidents(): Promise<IIncidentReportModel[]> {
        try {
            return await IncidentReportModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    },

    async createIncident(body: IIncidentReportModel): Promise<IIncidentReportModel> {
        try {
            const incident: IIncidentReportModel = new IncidentReportModel({
                imagePath: body.imagePath,
                location: body.location,
                category: body.category
            });

            const query: any = await IncidentReportModel.findOne({ imagePath: body.imagePath });

            if (query)
                throw new Error("Este incidente ja foi registrado...");

            const saved: IIncidentReportModel = await incident.save();

            return saved;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findIncident(id: string): Promise<IIncidentReportModel> {
        try {
            const incident = await IncidentReportModel.findOne({ _id: id });
            if (incident)
                return incident;
            else
                throw new Error("Incident não encontrado");
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findCategory(body: any): Promise<IIncidentReportModel[]> {
        try {
            const incident: any = await IncidentReportModel.find({ category: body.category });
            if (incident != [])
                return incident;
            else
                throw new Error("Categoria não encontrada");
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async deleteIncident(id: string): Promise<any> {
        try {
            const incident = await IncidentReportModel.remove({ _id: id });
            if (incident)
                return incident;
            else
                throw new Error("Incident não encontrado");
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


export = UserService;