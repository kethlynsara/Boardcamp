import { Router } from 'express';
import { postRental } from '../controllers/rentalsController.js';
import { rentalValidate } from '../middlewares/rentalMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals', rentalValidate, postRental);

export default rentalsRouter;