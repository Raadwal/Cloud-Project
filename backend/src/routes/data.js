import { Router } from 'express';
import dataModel from '../models/data';

const data = Router();

data.post('/add', async (req, res) => {
    const result = await dataModel.addData();
    res.json(result);
});

data.delete('/delete', async (req, res) => {
    const result = await dataModel.deleteData();
    res.json(result);
});

export default data;