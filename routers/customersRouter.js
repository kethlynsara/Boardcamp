import { Router } from 'express';

import { getAllCustomers, getCustomer, postCustomer, putCustomer } from '../controllers/customersController.js';
import { inputsValidate } from '../middlewares/customerInputsValidation.js';

const customersRouter = Router();

customersRouter.get('/customers', getAllCustomers);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', inputsValidate, postCustomer);
customersRouter.put('/customers/:id', inputsValidate, putCustomer);

export default customersRouter;