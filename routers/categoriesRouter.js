import { Router } from 'express';
import { getAllCategories } from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getAllCategories);

export default categoriesRouter;