import { Router } from 'express';
import { addGame } from '../controllers/gamesController.js';
import { gamesMiddleware } from '../middlewares/gamesMiddleware.js';

const gamesRouter = Router();

gamesRouter.post('/games', gamesMiddleware, addGame);

export default gamesRouter;