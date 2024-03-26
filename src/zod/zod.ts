import {AnyZodObject, z} from "zod";

export const ValidationZod = z.object({
    name: z.string().min(3),
    category:z.string().optional(),
    pages:z.number().min(1)
})

export const ValidationPatch = ValidationZod.partial()

export interface IRequestSchemas {
    body?: AnyZodObject;
    params?: AnyZodObject;
    query?: AnyZodObject;
}
