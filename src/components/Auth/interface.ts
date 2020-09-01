import { IUserModel } from "../User/model";

export interface IAuthService{
    createUser(IUserModel: IUserModel): Promise < IUserModel >;
    login(IUserModel: IUserModel): Promise < IUserModel >;
}