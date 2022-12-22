import { Router } from 'express';
import bookModel from '../models/book';

const book = Router();

book.get('/', async (req, res) => {
    const result = await bookModel.findAll();
    res.json(result);
});

book.get('/:id', async (req, res) => {
    const result = await bookModel.findById(req.params.id);
    res.json(result);
});

book.post('/', async (req, res) => {
    const result = await bookModel.create(req.body);
    res.json(result);
});

book.put('/:id', async (req, res) => {
    const result = await bookModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
});

book.delete('/:id', async (req, res) => {
    const result = await bookModel.findByIdAndDelete(req.params.id);
    res.json(result);
});

book.post('/:bookId/tag/:tagId', async (req, res) => {
    const result = await bookModel.addTag(req.params.bookId, req.params.tagId);
    res.json(result);
});

book.get('/:id/tags', async (req, res) => {
    const result = await bookModel.getAllTags(req.params.id);
    res.json(result);
});

book.delete('/:idBook/tag/:idTag', async (req, res) => {
    const result = await bookModel.deleteTag(req.params.idBook, req.params.idTag);
    res.json(result);
});

export default book;