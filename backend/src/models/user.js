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
    const session = startSession()
    const result = await session.run(`MATCH (u:User) RETURN u`);
    return result.records.map(i=>i.get('u').properties);
};

const findById = async (id) => {
    const session = startSession()
    const result = await session.run(`MATCH (u:User {_id : '${id}'}) RETURN u LIMIT 1`);
    return result.records.map(i=>i.get('u').properties);
};

const create = async (user) => {
    const session = startSession()
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (u:User {
                                                        _id : '${unique_id}'
                                                        , name: '${user.name}'
                                                        , surname: '${user.surname}'
                                                        , nickname: '${user.nickname}'
                                                        , email: '${user.email}'
                                                        , password: '${user.password}'
                                                    }) RETURN u`);


    return result.records.map(i=>i.get('u').properties);
};

const findByIdAndUpdate = async (id, user) => {
    const session = startSession()
    const result = await session.run(`MATCH (u:User {_id : '${id}'}) SET 
                                                                    u.name = '${user.name}'
                                                                    , u.surname = '${user.surname}'
                                                                    , u.nickname = '${user.nickname}'
                                                                    , u.email = '${user.email}' 
                                                                    , u.password = '${user.password}' 
                                                                    RETURN u`);
    return result.records.map(i=>i.get('u').properties);
};

const findByIdAndDelete = async (id) => {
    const session = startSession()
    await session.run(`MATCH (u:User {_id : '${id}'}) DETACH DELETE u`);
    return await findAll();
};

const rateBook = async (userId, rating) => {
    const session = startSession()
    const result = await session.run(`MATCH (u:User), (b:Book)
                                      WHERE u._id = '${userId}' AND b._id = '${rating.bookId}'
                                      CREATE (u)-[:RATED {score: '${rating.score}'}]->(b)
                                      return u, b
    `);

    const resultData = {
        user: result.records.map(i=>i.get('u').properties),
        book: result.records.map(i=>i.get('b').properties)
    }

    return resultData;
};

const getRatedBooksAboveValue = async (id, value) => {
    const session = startSession()
    const result = await session.run(`MATCH (u:User)-[r:RATED]->(b)
                                      WHERE u._id = '${id}' AND toInteger(r.score) >= toInteger('${value}')
                                      RETURN b
                                      ORDER BY r.score DESC
    `);

    return result.records.map(i=>i.get('b').properties);
}

const getReviews = async (id) => {
    const session = startSession();

    const result = await session.run(`MATCH (u:User)-[r:RATED]->(b:Book)
                                    WHERE u._id = '${id}'
                                    RETURN b, r
    `);

    const books = result.records.map(i=>i.get('b').properties);
    const reviews = result.records.map(i=>i.get('r').properties);

    const resultData = [];

    for(let i = 0; i < books.length; i++) {
        resultData.push({
            book: books[i],
            review: reviews[i],
        });
    }

    return resultData;
}

const deleteReview = async (idUser, idBook) => {
    const session = startSession();

    const result = await session.run(`MATCH (u:User)-[r:RATED]->(b:Book)
                                    WHERE u._id = '${idUser}' AND b._id = '${idBook}'
                                    DETACH DELETE r
    `);

    return getReviews()
}

const findRecommendations = async (id) => {
    const session = startSession()
    const result = await session.run(`MATCH (u:User)-[r:RATED]->(b:Book)
                                        WHERE u._id = '${id}'
                                        WITH b, toInteger(r.score) AS score
                                        ORDER BY score DESC
                                        LIMIT 3
                                        MATCH (b)-[:TAGGED]->(t:Tag)
                                        WITH DISTINCT t
                                        MATCH (u:User)-[r:RATED]->(b:Book)-[:TAGGED]->(t)
                                        WITH b, t, AVG(toInteger(r.score)) AS avgScore, COUNT(u) AS rateCount
                                        ORDER BY avgScore DESC
                                        RETURN b, avgScore, rateCount
                                        LIMIT 10
    `);

    const books = result.records.map(i=>i.get('b').properties);
    const avgScores = result.records.map(i=>i.get('avgScore'));
    const rateCount = result.records.map(i=>i.get('rateCount'));

    const resultData = [];

    for(let i = 0; i < books.length; i++) {
        resultData.push({
            book: books[i],
            score: avgScores[i],
            rateCount: rateCount[i]
        });
    }

    return resultData;
};

export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
    rateBook,
    findRecommendations,
    getReviews,
    deleteReview,
    getRatedBooksAboveValue
}