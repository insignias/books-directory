import express, { Application, json } from "express";
import { router } from "./routes";


export function createServer(): Application {
    const app: Application = express();
    app.use(json());

    const booksDirectoryRouter = router;

    app.use('/booksDirectory', booksDirectoryRouter);
    return app
}