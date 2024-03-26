import {Books} from "../interfaces/books.interface";

export const booksDatabase:Books[] = []

let id = 0

export const generateId = () =>{
    id++
    return id
}