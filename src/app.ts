import express, { json } from "express";
import {HandleErrors, IsBookIdValid} from "./Middleware/Middleware.books";
import {booksRouter} from "./routes/books.routes";
import helmet from "helmet";
import 'express-async-errors'

export const app = express();
app.use(helmet());
app.use(json());
app.use("/books", booksRouter);
app.use(HandleErrors.execute)
// app.use(IsBookIdValid.execute)


