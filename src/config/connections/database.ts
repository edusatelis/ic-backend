import  mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
interface IConnectOptions {
    autoReconnect: boolean;
    reconnectTries: number; // Never stop trying to reconnect
    reconnectInterval: number;
    loggerLevel ? : string;
    useNewUrlParser ? : boolean;
}

const connectOptions: IConnectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
};

export const db: any= mongoose.connect('mongodb://localhost:27017/db_embrapa', connectOptions , (err)=>{
    if(err)
        console.log(`I can't connect in MongoDB`);
    else
        console.log('MongoDB ::: Connected');
});
// handlers
// db.on('connecting', () => {
//     console.log('\x1b[32m', 'MongoDB :: connecting');
// });

// db.on('error', (error:any) => {
//     console.log('\x1b[31m', `MongoDB :: connection ${error}`);
//     mongoose.disconnect();
// });

// db.on('connected', () => {
//     console.log('\x1b[32m', 'MongoDB :: connected');
// });
