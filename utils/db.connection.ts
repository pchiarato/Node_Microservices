import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbConnection = (connectionString: string, name = 'Database') => {
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            // tslint:disable-next-line
            console.error(err);
        }
        // tslint:disable-next-line
        console.log(`connected to ${name}`);
    });
};

export default dbConnection;
