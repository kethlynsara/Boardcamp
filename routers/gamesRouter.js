import { Router } from 'express';
import { addGame, getAllGames } from '../controllers/gamesController.js';
import { gamesMiddleware } from '../middlewares/gamesMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', getAllGames);
gamesRouter.post('/games', gamesMiddleware, addGame);

export default gamesRouter;