import { Request, Response } from "express";
import {BooksServices} from "../services/books.services";
import {booksDatabase, generateId} from "../database/database";


export class BooksControllers{

    getBooks(req: Request, res: Response): Response{
        const SearchTerm = req.query.search  as string | undefined
        let Books = booksDatabase
        if (SearchTerm) {
            // Se um termo de busca foi fornecido, filtra os livros cujo título contém o termo de busca
            Books = booksDatabase.filter(book => book.name.toLowerCase().includes(SearchTerm.toLowerCase()));
        }

        return res.status(200).json(Books);
    }

    getBooksId(req:Request, res: Response):Response{
        const bookId = req.params.id
        const book = booksDatabase.find(book => book.id === parseInt(bookId))
        return res.status(200).json(book)
    }

    createBook(req: Request, res: Response) :Response {
        const { name, pages, category } = req.body
        const booksServices = new BooksServices()
        const response =  booksServices.createBook(name, pages, new Date(), new Date(), category)
        return res.status(201).json(response)
    }

    updateBook(req: Request, res: Response) {
        const { name, pages, category } = req.body
        const id = parseInt(req.params.id)
        const booksServices = new BooksServices()
        const response = booksServices.updateBook(id, name, pages, new Date(), new Date,category)
        const index = booksDatabase.findIndex(book => book.id === id)
        return res.status(200).json(response)
    }

    deleteBook(req:Request , res: Response):Response{
        const bookId = req.params.id
        const bookIndex = booksDatabase.findIndex(book => book.id === parseInt(bookId))
        booksDatabase.splice(bookIndex, 1)
        return res.status(204)
    }


}