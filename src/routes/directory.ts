import { Request, Response, Router } from 'express';
import { getBookById } from '../middleware';
import { directoryModel } from '../model';

export const router = Router();

// Get all books
router.get('/', async (req: Request, res: Response) => {
    try {
        const allBooks = await directoryModel.find();
        res.json(allBooks)
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
})

// Get book by id
router.get('/:id', getBookById, (req: Request, res: Response) => {
    const book = res.locals.book
    res.json(book)
})

// Add a book
router.post('/', async (req: Request, res: Response) => {
    const book = new directoryModel({
        name: req.body.name,
        author: req.body.author,
        year: req.body.year
    })
    try {
        const newBook = await book.save()
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

// Update a book
router.patch('/:id', getBookById, async (req: Request, res: Response) => {
    const book = res.locals.book
    const name = req.body.name
    if (name) {
        book.name = name
    }
    const author = req.body.author
    if (author) {
        book.author = author
    }
    const year = req.body.year
    if (year) {
        book.year = year
    }
    book.date = Date.now()

    try {
        const updateBook = await book.save()
        res.status(201).json(updateBook)
    } catch (error: any) {
        res.status(400).json({ message: error.message})
    }
})

// Delete a book
router.delete('/:id', getBookById, async (req: Request, res: Response) => {
    try {
            await directoryModel.deleteOne({
                _id: req.params.id
            })
            res.json({ message: 'Delete successful'})
    } catch (error: any) {
        res.status(500).json({ message: error.message})
    }
})

