import { NextFunction, Request, Response } from "express";
import { AppError } from "../AppError/apperror"
import {booksDatabase} from "../database/database";
import {app} from "../app";

export class HandleErrors{
    static execute(err: Error, req: Request, res: Response, next: NextFunction){
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({ error: err.message });
        } else {
            console.log(err);
            return res.status(500).json({ error: "Internal server error."});
        }
    }
}



export class IsBookIdValid {
    static execute(req: Request, res: Response, next: NextFunction) {
        const idFound = booksDatabase.find(
            book => book.id === parseInt(req.params.id)
        );
        if (!idFound){
            throw new AppError(404, "Book not found.")
        }
        return next();
    }
}


export class IsBookNameValid{
    static execute(req: Request, res: Response, next: NextFunction){
        const {name} = req.body
        const NameFound = booksDatabase.some(
            book => book.name === name
        )
        if (NameFound){
            throw new AppError(409, "Book already registered.")
        }
        return next()

    }
}