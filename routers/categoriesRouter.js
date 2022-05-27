import { Router } from 'express';

import { addCategory, getAllCategories } from '../controllers/categoriesController.js';
import { categoryMiddleware } from '../middlewares/categoryMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', getAllCategories);
categoriesRouter.post('/categories', categoryMiddleware, addCategory);

export default categoriesRouter;