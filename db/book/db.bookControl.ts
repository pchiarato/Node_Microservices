import bookSchema, { IBook } from './book.model';
import dbConnection from './../../utils/db.connection';
import Schema from 'mongoose';
const connectionString = process.env.BOOK_DB_CONNECTION_STRING || '';

export const getBooks = async () => {
    dbConnection(connectionString, 'BOOK DATABASE');
    try {
        const books: IBook[] | null = await bookSchema.find();
        return Promise.resolve(books);
    } catch (e) {
        // tslint:disable-next-line
        console.log('-error- ', e);
        return Promise.reject(null);
    }
};
export const createBook = async (book: IBook) => {
    dbConnection(connectionString, 'BOOK DATABASE');
    try {
        const newBook = new bookSchema(book);
        const response = await newBook.save();
        return Promise.resolve(response);
    } catch (e) {
        // tslint:disable-next-line
        console.error('createBook', e);
        return Promise.reject(null);
    }
};

export const deleteBook = async (id: string) => {
    dbConnection(connectionString, 'BOOK DATABASE');
    const queryId = Schema.Types.ObjectId(id);
    try {
        const response = await bookSchema.findByIdAndDelete(queryId);
        return Promise.resolve(response);
    } catch (e) {
        return Promise.reject(null);
    }
};

export const updateBook = async (id: string, book: IBook) => {
    dbConnection(connectionString, 'BOOK DATABASE');
    const queryId = Schema.Types.ObjectId(id);
    try {
        const response = await bookSchema.findByIdAndUpdate(queryId, book);
        return Promise.resolve(response);
    } catch (e) {
        return Promise.reject(null);
    }
};




