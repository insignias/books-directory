import { Request, Response, Router } from 'express';
import { getBookById } from '../middlewares';
import { addBookToDirectory, deleteBookById, getAllBooksFromDirectory, updateBookById } from '../controllers';

export const router = Router();

// Get all books
router.get('/', getAllBooksFromDirectory)

// Get book by id
router.get('/:id', getBookById, (req: Request, res: Response) => {
    const book = res.locals.book
    res.json(book)
})

// Add a book
router.post('/', addBookToDirectory)

// Update a book
router.patch('/:id', getBookById, updateBookById)

// Delete a book
router.delete('/:id', getBookById, deleteBookById)

