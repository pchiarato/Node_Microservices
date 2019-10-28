import mongoose, { Schema, Document } from 'mongoose';
// Mongo Schema and Interface
export interface IBook extends Document {
    title: string;
    author: string;
    numberPages: number;
    publisher: string;
}

const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    numberPages: { type: Number, required: false },
    publisher: { type: String, required: false },
});

export default mongoose.model<IBook>('books', bookSchema);
