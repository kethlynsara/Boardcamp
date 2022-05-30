import { Router } from 'express';
import { closeRental, deleteRental, getAllRentals, postRental } from '../controllers/rentalsController.js';
import { closedRentalValidate, rentalValidate } from '../middlewares/rentalMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getAllRentals);
rentalsRouter.post('/rentals/:id/return', closedRentalValidate, closeRental)
rentalsRouter.post('/rentals', rentalValidate, postRental);
rentalsRouter.delete('/rentals/:id', closedRentalValidate, deleteRental);

export default rentalsRouter;