import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnection = async (connectionString: string, name = 'Database'): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line
        mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
           if (err) {
               // tslint:disable-next-line
               console.error(err);
               return reject(false);
           }
           // tslint:disable-next-line
           console.log(`connected to ${name}`);
           return resolve(true);
       });
    });
};

export default dbConnection;
