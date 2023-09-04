import express, { Application, json } from 'express';
import { config } from 'dotenv';
import { db } from './db';
import { router } from './routes';

config({path: '.env'})

const port = process.env.PORT || 4000;

const app: Application = express();

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'))
db.on('disconnected', () => 'Disconnected from Database')

app.use(json());

const booksDirectoryRouter = router;

app.use('/booksDirectory', booksDirectoryRouter);

app.listen(port, () => console.log(`Server started at port: ${port}`));