import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import categoriesRouter from './routers/categoriesRouter.js';
import customersRouter from './routers/customersRouter.js';
import gamesRouter from './routers/gamesRouter.js';
import rentalsRouter from './routers/rentalsRouter.js';

const app = express();
app.use(cors());
app.use(json());

app.use(categoriesRouter);
app.use(customersRouter);
app.use(gamesRouter);
app.use(rentalsRouter);

app.listen(process.env.PORT, () => {
    console.log('Listening on port: ' + process.env.PORT);
});