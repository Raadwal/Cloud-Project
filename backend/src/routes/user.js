import { Router } from 'express';
import userModel from '../models/user';

const user = Router();

user.get('/', async (req, res) => {
    const result = await userModel.findAll();
    res.json(result);
});

user.get('/:id', async (req, res) => {
    const result = await userModel.findById(req.params.id);
    res.json(result);
});

user.post('/', async (req, res) => {
    const result = await userModel.create(req.body);
    res.json(result);
});

user.put('/:id', async (req, res) => {
    const result = await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
});

user.delete('/:id', async (req, res) => {
    const result = await userModel.findByIdAndDelete(req.params.id);
    res.json(result);
});

user.post('/:idUser/rate', async (req, res) => {
    const result = await userModel.rateBook(req.params.idUser, req.body);
    res.json(result);
});

user.get('/:id/reviews', async (req, res) => {
    const result = await userModel.getReviews(req.params.id);
    res.json(result);
});

user.delete('/:idUser/review/:idBook', async (req, res) => {
    const result = await userModel.deleteReview(req.params.idUser, req.params.idBook);
    res.json(result);
});

user.get('/:id/rated/:value', async (req, res) => {
    const result = await userModel.getRatedBooksAboveValue(req.params.id, req.params.value);
    res.json(result);
});

user.get('/:id/recommendations', async (req, res) => {
    const result = await userModel.findRecommendations(req.params.id);
    res.json(result);
});

export default user;