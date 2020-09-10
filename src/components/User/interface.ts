import { IIncidentReportModel } from "../../config/models/categoriaModel";

export interface IUserService{
    findAllIncidents(): Promise < IIncidentReportModel[] >;
    createIncident(IIncidentReportModel: IIncidentReportModel): Promise <IIncidentReportModel>;
    findIncident(id: string): Promise <IIncidentReportModel>;
    deleteIncident(id: string): Promise <void>;


    // getUser(IUserModel: IUserModel): Promise < IUserModel >;
}