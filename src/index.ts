import * as dotenv from 'dotenv';
import * as Routes from './routes/index';
import express from 'express';
import * as Middleware from './config/middlewares/index';
import  './config/connections/database';

/*inicializa o dotenv */
dotenv.config();

const PORT = process.env.PORT || 3050;

const app: express.Application = express();

Middleware.configure(app);

Routes.init(app);
app.get('/', (req: express.Request, res: express.Response) =>{
    res.status(200).send("API v0.1");
});

app.listen(PORT, ()=>{
    console.log(`The Server is running in port: ${PORT}`);
});