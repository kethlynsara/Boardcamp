import { Router } from 'express';
import { getAllRentals, postRental } from '../controllers/rentalsController.js';
import { rentalValidate } from '../middlewares/rentalMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getAllRentals)
rentalsRouter.post('/rentals', rentalValidate, postRental);

export default rentalsRouter;