import Router, { Request, Response } from 'express';
import { getOrders, createOrder, getOrderById } from './../../db/order/db.order.controller';
import { IOrder } from './../../db/order/order.model';
import { rest, ServiceList } from './../../utils/restService';
const orderController = Router();

orderController.get('/', async (req: Request, res: Response) => {
    getOrders()
    .then((orders: IOrder[] | null) => {
        if (orders) {
                res.status(200).json(orders);
        } else {
            res.status(404).json({message: 'No orders found'});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'Invalid query.'});
    });
});

orderController.get('/:id', async (req: Request, res: Response) => {
    const queryId = req.params.id;
    getOrderById(queryId)
    .then((order: IOrder | null) => {
        if (order) {
            Promise.all([
                rest.getResource(ServiceList.BOOK_SERVICE, `/book/${order.bookId.toString()}`),
                rest.getResource(ServiceList.CUSTOMER_SERVICE, `/customer/${order.customerId.toString()}`)])
            .then((promises) => {
                const { title } = promises[0].data;
                const { firstName, lastName } = promises[1].data;
                const response = {
                    bookName: title,
                    customerName: firstName + ' ' + lastName,
                    orderId: order._id,
                    purchasedDate: order.purchasedDate,
                    price: order.purchasedPrice,
                };
                res.status(200).json(response);
            }).catch((error) => {
                // tslint:disable-next-line
                console.log(error, 'promise.all');
            });
        } else {
            res.status(404).json({message: 'No orders found.'});
        }
    }).catch(() => {
            res.status(400).json({message: 'invalid query'});
        });
});

orderController.post('/', async (req: Request, res: Response) => {
    const order: IOrder = req.body;
    createOrder(order)
    .then((newOrder) => {
        res.status(200).json(newOrder);
    })
    .catch(() => {
        res.status(400).json({message: 'Incorrect format'});
    });
});



export default orderController;
