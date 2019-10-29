import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import orderController from './../controllers/order.controller';
import dotenv from 'dotenv';
dotenv.config();

const orderService: Application = express();
orderService.use(bodyParser.json());
const port = process.env.ORDER_SERVICE_PORT || 3003;

orderService.use('/order', orderController);
orderService.listen(port, () => {
    // tslint:disable-next-line
    console.log(`running order service on ${port}`);
});
