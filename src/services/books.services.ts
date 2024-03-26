

import {booksDatabase, generateId} from "../database/database";
import {Books} from "../interfaces/books.interface";
import {Request} from "express";


export class BooksServices {


        createBook(name: string, pages: number, createdAt: Date, updatedAt: Date, category?: string | undefined) {
                const newBook: Books = {id: generateId(), name, pages, category, createdAt, updatedAt}
                booksDatabase.push(newBook)
              return newBook
        }
        updateBook(id:number,  name: string , pages:number , createdAt:Date, updatedAt:Date, category?: string | undefined ) {
            const Book:Books = {id, name, pages,createdAt, updatedAt, category}
            const index = booksDatabase.findIndex(book => book.id === id)
            const existingBook = booksDatabase[index];
            // Atualiza apenas as propriedades que foram fornecidas, mantendo as existentes
            const updatedBookWithDefaults: Books = {
                id,
                name: Book.name || existingBook.name,
                pages: Book.pages || existingBook.pages,
                createdAt: Book.createdAt || existingBook.createdAt,
                updatedAt: Book.updatedAt || existingBook.updatedAt,
                category: Book.category !== undefined ? Book.category : existingBook.category
            };
            booksDatabase[index] = updatedBookWithDefaults;
            return updatedBookWithDefaults;
        }

}



