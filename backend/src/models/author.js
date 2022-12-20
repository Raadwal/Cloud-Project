import * as nanoid from 'nanoid';
const neo4j = require('neo4j-driver');

require('dotenv').config();

const {
    NEO4J_URI,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
} = process.env;

const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
const session = driver.session();

const findAll = async () => {
    const result = await session.run(`MATCH (a:Author) RETURN a`);
    return result.records.map(i=>i.get('a').properties);
};

const findById = async (id) => {
    const result = await session.run(`MATCH (a:Author {_id : '${id}'}) RETURN a LIMIT 1`);
    return result.records[0].get('a').properties;
};

const create = async (author) => {
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (a:Author {
                                                        _id : '${unique_id}'
                                                        , name: '${author.name}'
                                                        , surname: '${author.surname}'
                                                        , age: '${author.age}'
                                                    }) RETURN a`);
    return result.records[0].get('a').properties;
};

const findByIdAndUpdate = async (id, author) => {
    const result = await session.run(`MATCH (a:Author {_id : '${id}'}) SET 
                                                                    a.name = '${author.name}'
                                                                    , a.surname = '${author.surname}'
                                                                    , a.age = '${author.age}' 
                                                                    RETURN a`);
    return result.records[0].get('a').properties;
};

const findByIdAndDelete = async (id) => {
    await session.run(`MATCH (a:Author {_id : '${id}'}) DELETE a`);
    return await findAll();
};

const addBook = async  (authorId, bookId) => {
    const result = await session.run(`MATCH (a:Author), (b:Book)
                                      WHERE a._id = '${authorId}' AND b._id = '${bookId}'
                                      CREATE (a)-[:WROTE]->(b)
                                      return a, b
    `);

    const resultData = {
        author: result.records[0].get('a').properties,
        book: result.records[0].get('b').properties
    }

    return resultData;
};

const getAllBooks = async (id) => {
    const result = await session.run(`MATCH (a:Author)-[t:WROTE]->(b:Book)
                                      WHERE a._id = '${id}'
                                      RETURN b`);
    return result.records.map(i=>i.get('b').properties);
}

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
    addBook,
    getAllBooks
}