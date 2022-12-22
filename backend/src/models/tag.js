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
    const result = await session.run(`MATCH (t:Tag) RETURN t`);
    return result.records.map(i=>i.get('t').properties);
};

const findById = async (id) => {
    const session = startSession();
    const result = await session.run(`MATCH (t:Tag {_id : '${id}'}) RETURN t LIMIT 1`);
    return result.records.map(i=>i.get('t').properties);
};

const create = async (tag) => {
    const session = startSession();
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (t:Tag {
                                                        _id : '${unique_id}'
                                                        , name: '${tag.name}'
                                                    }) RETURN t`);
    return result.records.map(i=>i.get('t').properties);
};

const findByIdAndUpdate = async (id, tag) => {
    const session = startSession();
    const result = await session.run(`MATCH (t:Tag {_id : '${id}'}) SET 
                                                                    t.name = '${tag.name}'
                                                                    RETURN t`);
    return result.records.map(i=>i.get('t').properties);
};

const findByIdAndDelete = async (id) => {
    const session = startSession();
    await session.run(`MATCH (t:Tag {_id : '${id}'}) DETACH DELETE t`);
    return await findAll();
};


export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
}