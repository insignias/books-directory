import { Request, Response, NextFunction } from "express";
import { directoryModel } from "../model";

export async function getBookById(req: Request, res: Response, next: NextFunction) {
    let book;
    const id = req.params.id;
    try {
        book = await directoryModel.findById(id);
        if (book === null) {
            return res.status(404).json({ message: `Book with id: ${id} not found`})
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

    res.locals.book = book
    next()
}