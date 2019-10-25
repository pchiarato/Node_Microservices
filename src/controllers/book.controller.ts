import Router, { Request, Response } from 'express';
import { IBook } from '../../db/book/book.model';
import { getBooks, createBook } from './../../db/book/db.bookControl';

// import dbConnection from './../../utils/db.connection';
// const connectionString = process.env.BOOK_DB_CONNECTION_STRING || '';
// dbConnection(connectionString, 'BOOK DATABASE');

const bookController = Router();

bookController.get('/', async (req: Request, res: Response) => {
    const books: IBook[] = await getBooks();
    if (books) {
        res.status(200).json(books);
    } else {
        res.status(404);
    }
});

bookController.post('/', async (req: Request, res: Response) => {
    const newBook: IBook = req.body;
    const response: IBook = await createBook(newBook);
    if (response) {
        res.status(200).json({message: `${response.title} was created.`});
    } else {
        res.status(400).json({message: 'incorrect format'});
    }
});
bookController.delete('/:id', async (req: Request, res: Response) => {
    // try {
    //     const response: IBook | null = await bookSchema.findByIdAndDelete(req.params.id);
    //     if (response) {
    //         res.status(200).json({message: `${response.title} was successfuly removed.`});
    //     } else {
    //         res.status(404);
    //     }
    // } catch (error) {
    //     res.status(400).json(error);
    // }
});

export default bookController;
