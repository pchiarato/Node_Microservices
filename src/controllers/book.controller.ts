import Router, { Request, Response } from 'express';
import { IBook } from '../../db/book/book.model';
import { getBooks, createBook, updateBook, deleteBook } from './../../db/book/db.bookControl';

const bookController = Router();

bookController.get('/', async (req: Request, res: Response) => {
    const books: IBook[] = await getBooks();
    if (books) {
        res.status(200).json(books);
    } else {
        res.status(404).json({message: 'not found'});
    }
});

bookController.post('/', async (req: Request, res: Response) => {
    const newBook: IBook = req.body;
    const response: IBook | null = await createBook(newBook);
    if (response) {
        res.status(200).json({message: `${response.title} was created.`});
    } else {
        res.status(400).json({message: 'incorrect format'});
    }
    // try {
    //     const response: IBook | null = await createBook(newBook);
    //     if (response) {
    //         res.status(200).json({message: `${response.title} was created.`});
    //     } else {
    //         res.status(400).json({message: 'incorrect format'});
    //     }
    // } catch (e) {
    //     res.status(400).json({message: 'incorrect format2'});
    // }
});

bookController.put('/:id', async (req: Request, res: Response) => {
    const queryId = req.params.id;
    const newBook: IBook = req.body;
    const book = await updateBook(queryId, newBook);
    if (book) {
        res.status(200).json({message: `${book.title} was updated successfuly`});
    } else {
        res.status(404).json({message: 'not found'});
    }
});
bookController.delete('/:id', async (req: Request, res: Response) => {
    const response: IBook | null = await deleteBook(req.params.id);
    if (response) {
        res.status(200).json({message: `${response.title} was removed successfuly`});
    } else {
        res.status(404).json({message: 'not found'});
    }
});

export default bookController;
