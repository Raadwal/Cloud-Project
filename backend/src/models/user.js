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
    const result = await session.run(`MATCH (u:User) RETURN u`);
    return result.records.map(i=>i.get('u').properties);
};

const findById = async (id) => {
    const result = await session.run(`MATCH (u:User {_id : '${id}'}) RETURN u LIMIT 1`);
    return result.records[0].get('u').properties;
};

const create = async (user) => {
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (u:User {
                                                        _id : '${unique_id}'
                                                        , name: '${user.name}'
                                                        , surname: '${user.surname}'
                                                        , nickname: '${user.nickname}'
                                                        , email: '${user.email}'
                                                        , password: '${user.password}'
                                                    }) RETURN u`);
    return result.records[0].get('u').properties;
};

const findByIdAndUpdate = async (id, user) => {
    const result = await session.run(`MATCH (u:User {_id : '${id}'}) SET 
                                                                    u.name = '${user.name}'
                                                                    , u.surname = '${user.surname}'
                                                                    , u.nickname = '${user.nickname}'
                                                                    , u.email = '${user.email}' 
                                                                    , u.password = '${user.password}' 
                                                                    RETURN u`);
    return result.records[0].get('u').properties;
};

const findByIdAndDelete = async (id) => {
    await session.run(`MATCH (u:User {_id : '${id}'}) DELETE u`);
    return await findAll();
};

const rateBook = async (userId, rating) => {
    const result = await session.run(`MATCH (u:User), (b:Book)
                                      WHERE u._id = '${userId}' AND b._id = '${rating.bookId}'
                                      CREATE (u)-[:RATED {score: '${rating.score}'}]->(b)
                                      return u, b
    `);

    const resultData = {
        user: result.records[0].get('u').properties,
        book: result.records[0].get('b').properties
    }

    return resultData;
};

const getRatedBooksAboveValue = async (id, value) => {
     const result = await session.run(`MATCH (u:User)-[r:RATED]->(b)
                                      WHERE u._id = '${id}' AND toInteger(r.score) >= '${value}'
                                      RETURN b
                                      ORDER BY r.score DESC
    `);

    return result;
}

const findRecommendations = async (id) => {

};

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
    rateBook,
    findRecommendations,
    getRatedBooksAboveValue
}