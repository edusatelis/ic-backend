import { IIncidentReportModel } from "../../config/models/categoriaModel";

export interface IUserService{
    createIncident(IIncidentReportModel: IIncidentReportModel): Promise <IIncidentReportModel>;
    findAllIncidents(): Promise < IIncidentReportModel[] >;
    findIncident(id: string): Promise <IIncidentReportModel>;
    findCategory(body: string): Promise <IIncidentReportModel[]>;
    deleteIncident(id: string): Promise <void>;

}