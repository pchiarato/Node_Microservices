import express from 'express';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import api from './controllers/api.controller';
import db from './controllers/db.controller';
dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use('/api', api);

app.use('/db', db);




app.listen(port, () => {
    // tslint:disable-next-line
    console.log(`running on port: ${port}`);
});
