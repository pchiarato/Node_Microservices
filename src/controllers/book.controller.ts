import Router, { Request, Response } from 'express';
import { IBook } from '../../db/book/book.model';
import { getBooks, createBook, updateBook, deleteBook, getBookById } from './../../db/book/db.bookControl';

const bookController = Router();

bookController.get('/', async (req: Request, res: Response) => {
    getBooks()
    .then((books: IBook[] | null) => {
        if (books) {
            res.status(200).json(books);
        } else {
            res.status(404).json({message: 'not found'});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'Invalid query.'});
    });
});

bookController.get('/:id', (req: Request, res: Response) => {
    const queryId = req.params.id;
    getBookById(queryId)
    .then((book: IBook | null) => {
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: 'Book not found'});
        }
    }).catch((e) => {
        res.status(400).json({message: e.message});
    });
});

bookController.post('/', async (req: Request, res: Response) => {
    const newBook: IBook = req.body;
    createBook(newBook)
    .then((response: IBook | null) => {
        if (response) {
            res.status(200).json({message: `${response.title} was created.`});
        } else {
            res.status(400).json({message: 'incorrect format'});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'incorrect format'});
    });
});

bookController.put('/:id', async (req: Request, res: Response) => {
    const queryId = req.params.id;
    const newBook: IBook = req.body;
    updateBook(queryId, newBook)
    .then((book: IBook | null) => {
        if (book) {
            res.status(200).json({message: `${book.title} was updated successfuly`});
        } else {
            res.status(404).json({message: 'not found'});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'incorrect format'});
    });
});

bookController.delete('/:id', async (req: Request, res: Response) => {
    deleteBook(req.params.id)
    .then((response: IBook | null) => {
        if (response) {
            res.status(200).json({message: `${response.title} was removed successfuly`});
        } else {
            res.status(404).json({message: 'not found'});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'incorrect format'});
    });
});

export default bookController;
