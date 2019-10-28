import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import bookController from './../controllers/book.controller';
import dotenv from 'dotenv';
dotenv.config();

const bookService: Application = express();
bookService.use(bodyParser.json());
const port = process.env.BOOK_SERVICE_PORT || 3001;

bookService.use('/book', bookController);
bookService.listen(port, () => {
    // tslint:disable-next-line
    console.log(`running book service on ${port}`);
});
