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
    const result = await session.run(`MATCH (t:Tag) RETURN t`);
    return result.records.map(i=>i.get('t').properties);
};

const findById = async (id) => {
    const result = await session.run(`MATCH (t:Tag {_id : '${id}'}) RETURN t LIMIT 1`);
    return result.records[0].get('t').properties;
};

const create = async (tag) => {
    const unique_id = nanoid.nanoid();
    const result = await session.run(`CREATE (t:Tag {
                                                        _id : '${unique_id}'
                                                        , name: '${tag.name}'
                                                    }) RETURN t`);
    return result.records[0].get('t').properties;
};

const findByIdAndUpdate = async (id, tag) => {
    const result = await session.run(`MATCH (t:Tag {_id : '${id}'}) SET 
                                                                    t.name = '${tag.name}'
                                                                    RETURN t`);
    return result.records[0].get('t').properties;
};

const findByIdAndDelete = async (id) => {
    await session.run(`MATCH (t:Tag {_id : '${id}'}) DELETE t`);
    return await findAll();
};


export default {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete,
}