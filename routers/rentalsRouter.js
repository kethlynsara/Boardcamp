import { Router } from 'express';
import { rentalValidate } from '../middlewares/rentalMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals', rentalValidate);

export default rentalsRouter;