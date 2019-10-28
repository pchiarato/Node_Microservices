import Router, {Request, Response} from 'express';
import { ICustomer } from './../../db/customer/customer.model';
import { createCustomer, getCustomers } from './../../db/customer/db.customerControl';

const customerController = Router();

customerController.get('/', async (req: Request, res: Response) => {
    getCustomers()
    .then((customers: ICustomer[]) => res.status(200).json(customers))
    .catch(() => res.status(404).json({message: 'No customers found'}));
});

customerController.post('/', async (req: Request, res: Response) => {
    const customer: ICustomer = req.body;
    createCustomer(customer)
    .then((response: ICustomer) => {
        res.status(200).json({message: `${response.email} was created.`});
    })
    .catch(() => res.status(400).json({message: 'Incorrect format'}));

});
export default customerController;
