import dotenv from 'dotenv';
import orderSchema, { IOrder } from './order.model';
import dbConnection from './../../utils/db.connection';
import { Types } from 'mongoose';


dotenv.config();
const connectionString = process.env.DB_CONNECTION_STRING || '';


// get orders method
export const getOrders = async (): Promise<IOrder[] | null> => {
    const connection = await dbConnection(connectionString, 'ORDER DATABASE');
    if (connection) {
        try {
            const orders: IOrder[] | null = await orderSchema.find();
            if (orders) {
                return Promise.resolve(orders);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed.'));
    }
};

// get order by id method

export const getOrderById = async (id: string) => {
    const queryId = Types.ObjectId(id);
    const connection = await dbConnection(connectionString, 'ORDER DATABASE');
    if (connection) {
        try {
            const order: IOrder | null = await orderSchema.findOne({_id: queryId});
            if (order) {
                return Promise.resolve(order);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed.'));
    }
};

// create order method
export const createOrder = async (order: IOrder) => {
    const connection = await dbConnection(connectionString, 'ORDER DATABASE');
    if (connection) {
        try {
            const newOrder = new orderSchema(order);
            const response = await newOrder.save();
            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed.'));
    }
};

