import Router, { Request, Response } from 'express';
import mongoose from 'mongoose';

const dbInstance = Router();
const connectionString = process.env.DB_CONNECTION_STRING || '';
dbInstance.get('/', async (req: Request, res: Response) => {
    mongoose.connect(connectionString, () => {
        // tslint:disable-next-line
        console.log('database is running');
        res.status(200).json('db is running');
    });
});

export default dbInstance;


