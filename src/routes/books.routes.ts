
import { Router } from "express";
import {BooksControllers} from "../controllers/books.controllers";
import {IsBookIdValid, IsBookNameValid} from "../Middleware/Middleware.books";
import {ValidateRequest} from "../Middleware/ValidateRequest";
import {ValidationPatch, ValidationZod} from "../zod/zod";


export const booksRouter = Router();

const booksControllers = new BooksControllers();


booksRouter.post("/",IsBookNameValid.execute,ValidateRequest.execute({ body: ValidationZod }), booksControllers.createBook);
booksRouter.get("/", booksControllers.getBooks );
booksRouter.get("/:id",IsBookIdValid.execute, booksControllers.getBooksId);
booksRouter.patch("/:id", IsBookIdValid.execute, ValidateRequest.execute({ body: ValidationPatch }), IsBookNameValid.execute,booksControllers.updateBook);
booksRouter.delete("/:id",IsBookIdValid.execute, booksControllers.deleteBook);



