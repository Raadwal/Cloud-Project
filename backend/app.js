import express from 'express';
import cors from 'cors';
import author from './src/routes/author';
import book from './src/routes/book';
import tag from './src/routes/tag';
import user from './src/routes/user';
import data from './src/routes/data';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended:true
}));

app.use('/author', author);
app.use('/book', book);
app.use('/tag', tag);
app.use('/user', user);
app.use('/data', data);

app.listen(process.env.PORT, () =>
  console.log('App listening on port: ' + process.env.PORT),
)