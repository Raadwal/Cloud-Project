import { Router } from 'express';
import tagModel from '../models/tag';

const tag = Router();

tag.get('/', async (req, res) => {
    const result = await tagModel.findAll();
    res.json(result);
});

tag.get('/:id', async (req, res) => {
    const result = await tagModel.findById(req.params.id);
    res.json(result);
});

tag.post('/', async (req, res) => {
    const result = await tagModel.create(req.body);
    res.json(result);
});

tag.put('/:id', async (req, res) => {
    const result = await tagModel.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
});

tag.delete('/:id', async (req, res) => {
    const result = await tagModel.findByIdAndDelete(req.params.id);
    res.json(result);
});

export default tag;