import * as nanoid from 'nanoid';
const neo4j = require('neo4j-driver');

require('dotenv').config();

const {
    NEO4J_URI,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
} = process.env;

const startSession = () => {
    const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
    const session = driver.session();

    return session;
};

const findAll = async () => {
    const session = startSession();
    const result = await session.run(`MATCH (a:Author) RETURN a`);
    return result.records.map(i=>i.get('a').properties);
};

const findById = async (id) => {
    const session = startSession();
    const result = await session.run(`MATCH (a:Author {_id : '${id}'}) RETURN a LIMIT 1`);
    return result.records.map(i=>i.get('a').properties);
};

const create = async (author) => {
    const session = startSession();
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (a:Author {
                                                        _id : '${unique_id}'
                                                        , name: '${author.name}'
                                                        , surname: '${author.surname}'
                                                        , age: '${author.age}'
                                                    }) RETURN a`);
    return result.records.map(i=>i.get('a').properties);
};

const findByIdAndUpdate = async (id, author) => {
    const session = startSession();
    const result = await session.run(`MATCH (a:Author {_id : '${id}'}) SET 
                                                                    a.name = '${author.name}'
                                                                    , a.surname = '${author.surname}'
                                                                    , a.age = '${author.age}' 
                                                                    RETURN a`);
    return result.records.map(i=>i.get('a').properties);
};

const findByIdAndDelete = async (id) => {
    const session = startSession();
    await session.run(`MATCH (a:Author {_id : '${id}'}) DETACH DELETE a`);
    return await findAll();
};

const addBook = async  (authorId, bookId) => {
    const session = startSession();
    const result = await session.run(`MATCH (a:Author), (b:Book)
                                      WHERE a._id = '${authorId}' AND b._id = '${bookId}'
                                      CREATE (a)-[:WROTE]->(b)
                                      return a, b
    `);

    const resultData = {
        author: result.records.map(i=>i.get('a').properties),
        book: result.records.map(i=>i.get('b').properties)
    }

    return resultData;
};

const getAllBooks = async (id) => {
    const session = startSession();
    const result = await session.run(`MATCH (a:Author)-[t:WROTE]->(b:Book)
                                      WHERE a._id = '${id}'
                                      RETURN b`);
    return result.records.map(i=>i.get('b').properties);
}

const deleteBook = async (idAuthor, idBook) => {
    const session = startSession();
    const result = await session.run(`MATCH (a:Author)-[w:WROTE]->(b:Book)
                                    WHERE a._id = '${idAuthor}' AND b._id = '${idBook}'
                                    DETACH DELETE w
    `);

    return getAllBooks();
}

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
    addBook,
    deleteBook,
    getAllBooks
}