import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customerId: string;
    bookId: string;
    purchasedDate: string;
    purchasedPrice: string;
}

const orderSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'books', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'customers', required: true },
    purchasedDate: { type: Date, required: true, default: new Date().toLocaleDateString() },
    purchasedPrice: { type: Schema.Types.Decimal128, required: true, ref: 'books' },
});

export default mongoose.model<IOrder>('orders', orderSchema);
