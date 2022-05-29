import { Router } from 'express';

import { getAllCustomers } from '../controllers/customersController.js';

const customersRouter = Router();

customersRouter.get('/customers', getAllCustomers);

export default customersRouter;