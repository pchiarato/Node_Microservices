import axios, {AxiosRequestConfig} from 'axios';
import dotenv from 'dotenv';
dotenv.config();


export enum ServiceList {
    ORDER_SERVICE = 'ORDERS_SERVICE',
    BOOK_SERVICE = 'BOOK_SERVICE',
    CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
}

export const rest = {
    getResource: async (service: ServiceList, requestURL: string, requestParams?: {}) => {
        const axiosRequestConfig: AxiosRequestConfig = {
            url: requestURL,
            baseURL: process.env[service],
            params: requestParams,
            method: 'get',
        };
        const r = axios.get(requestURL, axiosRequestConfig);
        return Promise.resolve(r);

    },
};
