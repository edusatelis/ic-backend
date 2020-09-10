import mongoose, { Document, Schema } from 'mongoose';


/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IIncidentReportModel extends Document {
    imagePath: string;
    date: Date;
    location: string;
    category: string;
    
}

const IncidentReportModel:Schema = new Schema({
    imagePath: {type: String, required: true},
    date: {type: Date, default: Date.now()},
    location: {type: String, required: true},
    category: {type: String, required: true}
});


export default mongoose.model<IIncidentReportModel>('incidentsReport',IncidentReportModel);