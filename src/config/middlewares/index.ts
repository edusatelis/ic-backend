
import * as bodyParser from 'body-parser';
import * as express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export  function configure(app: express.Application): void {

    app.use(helmet());
    // Assegura que a o requisitante sejá apenas o desejado
    app.use(cors());
    //Permite utilizar QueryString
    app.use(bodyParser.urlencoded({ extended: false }));
    //Permite utilizar JSON
    app.use(bodyParser.json());

}
