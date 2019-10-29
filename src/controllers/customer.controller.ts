import Router, {Request, Response} from 'express';
import { ICustomer } from './../../db/customer/customer.model';
import {
    createCustomer,
    getCustomers,
    getCustomerById,
    deleteCustomerById,
    updateCustomer,
 } from './../../db/customer/db.customerControl';

const customerController = Router();

customerController.get('/', async (req: Request, res: Response) => {
    getCustomers()
    .then((customers: ICustomer[]) => res.status(200).json(customers))
    .catch(() => res.status(404).json({message: 'No customers found'}));
});

customerController.get('/:id', (req: Request, res: Response) => {
    const queryId = req.params.id;
    getCustomerById(queryId)
    .then((customer: ICustomer | null ) => {
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({message: `Did not find a customer with id ${queryId}`});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'invalid query'});
    });
});

customerController.post('/', async (req: Request, res: Response) => {
    const customer: ICustomer = req.body;
    createCustomer(customer)
    .then((response: ICustomer) => {
        res.status(200).json({message: `${response.email} was created.`});
    })
    .catch(() => res.status(400).json({message: 'Incorrect format'}));
});

customerController.put('/:id', (req: Request, res: Response) => {
    const queryId = req.params.id;
    const customer: ICustomer = req.body;
    updateCustomer(queryId, customer)
    .then((updatedCustomer: ICustomer | null) => {
        if (updatedCustomer) {
            res.status(200).json({message: `${updatedCustomer.email} was updated successfuly`});
        } else {
            res.status(404).json({message: `Did not find customer to update with ${queryId} id`});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'Incorrect format'});
    });
});

customerController.delete('/:id', (req: Request, res: Response) => {
    const queryId = req.params.id;
    deleteCustomerById(queryId)
    .then((customer: ICustomer | null) => {
        if (customer) {
            res.status(200).json({message: `${customer.email} was deleted`});
        } else {
            res.status(404).json({message: `Did not find any customers with ${queryId} id`});
        }
    })
    .catch(() => {
        res.status(400).json({message: 'Invalid request'});
    });
});

export default customerController;
