import * as dotenv from 'dotenv';
import * as Routes from './routes/index';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

/*inicializa o dotenv */
dotenv.config();

const PORT = process.env.PORT || 3050;

const app: express.Application = express();

Routes.init(app);
app.use(helmet());
app.use(cors());
//Permite utilizar QueryString
app.use(bodyParser.urlencoded({extended: false}));
//Permite utilizar JSON
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) =>{
    res.status(200).send("API v0.1");
})

app.listen(PORT, ()=>{
    console.log(`The Server is running in port: ${PORT}`);
});