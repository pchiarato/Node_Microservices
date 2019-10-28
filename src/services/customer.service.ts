import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import customerController from './../controllers/customer.controller';
import dotenv from 'dotenv';
dotenv.config();

const customerService: Application = express();
customerService.use(bodyParser.json());
const port = process.env.CUSTOMER_SERVICE_PORT || 3002;

customerService.use('/customer', customerController);
customerService.listen(port, () => {
    // tslint:disable-next-line
    console.log(`running customer service on ${port}`);
});
