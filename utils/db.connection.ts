import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnection = async (connectionString: string, name = 'Database'): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line
        mongoose.connect(connectionString,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }, (err) => {
           if (err) {
               // tslint:disable-next-line
               console.error(err);
               return reject(false);
           }
           // tslint:disable-next-line
           // console.log(`connected to ${name}`); debug:log
           return resolve(true);
       });
        // mongoose.set('useCreateIndex', true); // added due to deprecationWarning
    });
};

export default dbConnection;
