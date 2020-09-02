import mongoose, { Document, Schema } from 'mongoose';
import * as connection from '../../config/connections/database';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface ICategoriaModel extends Document {
    name: string;
    
}

const SystemUser:Schema = new Schema({
    name: {type: String, required: true },
    cpf: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    registrationDate: {type: Date, default: Date.now},
    active: {type: Boolean, required: false, default: true}
});


export default mongoose.model<ICategoriaModel>('categoria',SystemUser);