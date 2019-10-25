import Router, { Request, Response } from 'express';
const api = Router();

api.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json('ok');
    } catch (err) {
        // tslint:disable-next-line
        console.error(`Error from api controller ${err}`);
    }
});


export default api;
