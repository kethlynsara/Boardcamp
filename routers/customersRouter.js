import { Router } from 'express';

import { getAllCustomers, getCustomer } from '../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', getAllCustomers);
customersRouter.get('/customers/:id', getCustomer);

export default customersRouter;