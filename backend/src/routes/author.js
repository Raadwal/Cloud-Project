import { Router } from 'express';
import authorModel from '../models/author';

const author = Router();

author.get('/', async (req, res) => {
    const result = await authorModel.findAll();
    res.json(result);
});

author.get('/:id', async (req, res) => {
    const result = await authorModel.findById(req.params.id);
    res.json(result);
});

author.post('/', async (req, res) => {
    const result = await authorModel.create(req.body);
    res.json(result);
});

author.put('/:id', async (req, res) => {
    const result = await authorModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
});

author.delete('/:id', async (req, res) => {
    const result = await authorModel.findByIdAndDelete(req.params.id);
    res.json(result);
});

author.post('/:authorId/wrote/:bookId', async (req, res) => {
    const result = await authorModel.addBook(req.params.authorId, req.params.bookId);
    res.json(result);
});

author.get('/:id/books', async (req, res) => {
    const result = await authorModel.getAllBooks(req.params.id);
    res.json(result);
});

export default author;