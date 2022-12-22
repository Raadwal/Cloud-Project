import { Router } from 'express';
import dataModel from '../models/data';

const data = Router();

data.post('/add/authors', async (req, res) => {
    const result = await dataModel.addAuthorsData();
    res.json(result);
});

data.post('/add/books', async (req, res) => {
    const result = await dataModel.addBooksData();
    res.json(result);
});

data.post('/add/users', async (req, res) => {
    const result = await dataModel.addUsersData();
    res.json(result);
});

data.post('/add/tags', async (req, res) => {
    const result = await dataModel.addTagsData();
    res.json(result);
});

data.post('/add/books/tags', async (req, res) => {
    const result = await dataModel.addBooksTags();
    res.json(result);
});

data.post('/add/authors/books', async (req, res) => {
    const result = await dataModel.addBooksAuthors();
    res.json(result);
});

data.post('/add/users/reviews', async (req, res) => {
    const result = await dataModel.addBooksReviews();
    res.json(result);
});

data.delete('/delete', async (req, res) => {
    const result = await dataModel.deleteData();
    res.json(result);
});

export default data;