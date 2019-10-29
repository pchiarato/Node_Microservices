import bookSchema, { IBook } from './book.model';
import dbConnection from './../../utils/db.connection';
import { Types } from 'mongoose';
const connectionString = process.env.DB_CONNECTION_STRING || '';

export const getBooks = async () => {
    const connection: boolean = await dbConnection(connectionString, 'BOOK DATABASE');
    if (connection) {
        try {
            const books: IBook[] | null = await bookSchema.find();
            return Promise.resolve(books);
        } catch (e) {
            // tslint:disable-next-line
            // console.log('error', e);
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('No Connection'));
    }
};

// get book by id method
export const getBookById = async (id: string) => {
    const connection = await dbConnection(connectionString, 'BOOK DATABASE');
    if (connection) {
        try {
            const book: IBook | null = await bookSchema.findOne({_id: id});
            if (book) {
                return Promise.resolve(book);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed'));
    }
}

export const createBook = async (book: IBook): Promise<IBook | null> => {
    const connection: boolean = await dbConnection(connectionString, 'BOOK DATABASE');
    if (connection) {
        try {
            const newBook = new bookSchema(book);
            const response: IBook = await newBook.save();
            return Promise.resolve(response);
        } catch (e) {
            // tslint:disable-next-line
            // console.error('createBook', e);
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('No connection'));
    }
};

export const deleteBook = async (id: string): Promise<IBook | null> => {
    const queryId = Types.ObjectId(id);
    const connection = await dbConnection(connectionString, 'BOOK DATABASE');
    if (connection) {
        try {
            const response: IBook | null = await bookSchema.findByIdAndDelete(queryId);
            // tslint:disable-next-line
            // console.log(response);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('No connection'));
    }
};

export const updateBook = async (id: string, book: IBook) => {
    const queryId = Types.ObjectId(id);
    const connection = await dbConnection(connectionString, 'BOOK DATABASE');
    if (connection) {
        try {
            await dbConnection(connectionString, 'BOOK DATABASE');
            const response = await bookSchema.findOneAndUpdate(queryId, book);
            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('No connection'));
    }
};




