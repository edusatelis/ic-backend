import bcryptjs from 'bcryptjs';
import UserModel, { IUserModel } from "../User/model";
import { IAuthService } from "./interface";
let validarcpf = require('validar-cpf');

const AuthService: IAuthService = {
    /**
     * 
     * @param {IUserModel} body
     * @returns { Promise<IUserModel>}
     * Esta função cria um novo usuario
     */
    async createUser(body: IUserModel): Promise<IUserModel> {
        try {
            let passHash: any = bcryptjs.hashSync(body.password);
            //Alimenta um objeto de novo usuario
            const user: IUserModel = new UserModel({
                name: body.name,
                email: body.email,
                password: passHash ,
                cpf: body.cpf
                // documents: [{ 
                //     name: "CPF", 
                //     value: body.cpf 
                // }]
            });

            //Pesquisa o email na base
            const query: any = await UserModel.findOne({ email: body.email });

            if (query) {
                throw new Error('Email já cadastrado');
            }

            //Pesquisa o cpf na base
            const cpf: any = await UserModel.findOne({ cpf: body.cpf});
            //Caso ja esteja cadastrado!
            if (cpf) {
                throw new Error('CPF ja existe!');
            }
            //Verifica a veracidade do cpf
            if (body.cpf == "11111111111" || body.cpf == "22222222222" ||
                body.cpf == "33333333333" || body.cpf == "44444444444" ||
                body.cpf == "55555555555" || body.cpf == "66666666666" ||
                body.cpf == "77777777777" || body.cpf == "88888888888" ||
                body.cpf == "99999999999" || body.cpf == "00000000000") {

                throw new Error('O CPF informado é invalido.');
            }

            //utiliza uma API externa pra verificar se o cpf é valido.
            if (validarcpf(body.cpf) == false) {
                throw new Error('O CPF informado é invalido.');
            }

            //Salva o usuario no banco de dados
            const saved: IUserModel = await user.save();

            return saved;

        } catch (error) {
            throw new Error(error); // Cria uma mensagem de erro
        }
    },

    async login(body: IUserModel): Promise<IUserModel> {

        try {
            // Busca o usuário a partir do e-mail
            const user: any = await UserModel.findOne({
                email: body.email
            });

            // Caso o e-mail não esteja casastrado 
            if (!user) {
                throw new Error('E-mail/Senha inválido(s)');
            }

            // Compara a senha que foi passada no corpo da requisição com a que está no banco
            const isMatched: boolean = await user.comparePassword(body.password);

            // Se as senhas forem iguais retorna o usuario
            if (isMatched) {
                return user;
            }

            // Caso a senha esteja errada
            throw new Error('E-mail/Senha inválido(s)');
        } catch (error) {
            throw new Error(error);
        }
    }
};


export default AuthService;