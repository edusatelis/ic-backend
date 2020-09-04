import bcryptjs from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';


/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    name: string;
    cpf: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise < boolean > ;
}

export type AuthToken = {
    accessToken: string,
    kind: string
};

const UserSchema: Schema = new Schema({
    name: String,
    cpf: {type: String, unique: true, trim: true},
    email: {type: String, unique: true, trim: true},
    password: String
}, {
    collection: 'users',
    versionKey: false
}).pre('save', async function (next: any): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const hash: string = await bcryptjs.hash(user.password, 10);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {        
        const match: boolean = await bcryptjs.compare(candidatePassword, this.password);
        return match;
    } catch (error) {
        return error;
    }
};

export default mongoose.model < IUserModel > ('users', UserSchema);
