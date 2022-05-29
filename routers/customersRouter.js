import { Router } from 'express';

import { getAllCustomers, getCustomer } from '../controllers/customersController.js';
import { inputsValidate } from '../middlewares/customerInputsValidation.js';

const customersRouter = Router();

customersRouter.get('/customers', getAllCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', inputsValidate);

export default customersRouter;