import * as mongoose from 'mongoose';

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

const MONGO_URI: string = `${process.env.MONGODB_URI}${process.env.MONGODB_DB_MAIN}`;

export const db: any= mongoose.connect(MONGO_URI, connectOptions);
// handlers
db.on('connecting', () => {
    console.log('\x1b[32m', 'MongoDB :: connecting');
});

db.on('error', (error:any) => {
    console.log('\x1b[31m', `MongoDB :: connection ${error}`);
    mongoose.disconnect();
});

db.on('connected', () => {
    console.log('\x1b[32m', 'MongoDB :: connected');
});
