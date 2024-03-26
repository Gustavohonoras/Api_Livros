import {AnyZodObject} from "zod";

export interface Books {
    id :number,
    name: string,
    pages :number,
    category? : string,
    createdAt: Date,
    updatedAt: Date
}