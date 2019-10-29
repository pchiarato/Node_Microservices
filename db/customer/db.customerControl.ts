import { Types } from 'mongoose';
import dotenv from 'dotenv';
import customerSchema, { ICustomer } from './customer.model';
import dbConnection from './../../utils/db.connection';


dotenv.config();
const connectionString = process.env.DB_CONNECTION_STRING || '';


// get customers method
export const getCustomers = async () => {
    const connection = await dbConnection(connectionString, 'CUSTOMER DATABASE');
    if (connection) {
        try {
            const customers: ICustomer[] = await customerSchema.find();
            return Promise.resolve(customers);
        } catch (error) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed.'));
    }
};

// create method
export const createCustomer = async (customer: ICustomer) => {
    const connection: boolean = await dbConnection(connectionString, 'CUSTOMER DATABASE');

    if (connection) {
        try {
            const newCustomer = new customerSchema(customer);
            const result = await newCustomer.save();
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed.'));
    }
};

// get customer by id method
export const getCustomerById = async (id: string): Promise<ICustomer | null> => {
    const queryId = Types.ObjectId(id);
    const connection = await dbConnection(connectionString, 'CUSTOMER DATABASE');
    if (connection) {
        try {
            const customer = await customerSchema.findById(queryId);
            if (customer) {
                return Promise.resolve(customer);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed'));
    }
};

// delete customer method
export const deleteCustomerById = async (id: string) => {
    const connection = await dbConnection(connectionString, 'CUSTOMER DATABASE');
    const queryId = Types.ObjectId(id);
    if (connection) {
        try {
            const response = await customerSchema.findByIdAndDelete(queryId);
            if (response) {
                return Promise.resolve(response);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            return Promise.reject(null);
        }
    } else {
        return Promise.reject(new Error('Connection failed'));
    }
};

// update customer by id method

export const updateCustomer = async (id: string, customer: ICustomer) => {
    const connection = await dbConnection(connectionString, 'CUSTOMER DATABASE');
    const queryId = Types.ObjectId(id);
    if (connection) {
        try {
            const updatedCustomer = await customerSchema.findOneAndUpdate({_id: queryId}, customer);
            if (updatedCustomer) {
                return Promise.resolve(updatedCustomer);
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

