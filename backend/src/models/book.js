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
    const result = await session.run(`MATCH (b:Book) RETURN b`);
    return result.records.map(i=>i.get('b').properties);
};

const findById = async (id) => {
    const result = await session.run(`MATCH (b:Book {_id : '${id}'}) RETURN b LIMIT 1`);
    return result.records[0].get('b').properties;
};

const create = async (book) => {
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (b:Book {
                                                        _id : '${unique_id}'
                                                        , title: "'${book.title}'"
                                                        , isbn: '${book.isbn}'
                                                        , year: '${book.year}'
                                                    }) RETURN b`);
    return result.records[0].get('b').properties;
};

const findByIdAndUpdate = async (id, book) => {
    const result = await session.run(`MATCH (b:Book {_id : '${id}'}) SET 
                                                                    b.title = "'${book.title}'"
                                                                    , b.isbn = '${book.isbn}'
                                                                    , b.year = '${book.year}' 
                                                                    RETURN b`);
    return result.records[0].get('b').properties;
};

const findByIdAndDelete = async (id) => {
    await session.run(`MATCH (b:Book {_id : '${id}'}) DELETE b`);
    return await findAll();
};

const addTag = async (bookId, tagId) => {
    const result = await session.run(`MATCH (b:Book), (t:Tag)
                                      WHERE b._id = '${bookId}' AND t._id = '${tagId}'
                                      CREATE (b)-[:TAGGED]->(t)
                                      return b, t
    `);

    const resultData = {
        book: result.records[0].get('b').properties,
        tag: result.records[0].get('t').properties
    }

    return resultData;
};

const getAllTags = async (id) => {
    const result = await session.run(`MATCH (b:Book)-[t:TAGGED]->(tag)
                                      WHERE b._id = '${id}'
                                      RETURN tag`);
    return result.records.map(i=>i.get('tag').properties);
}

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
    addTag,
    getAllTags
}