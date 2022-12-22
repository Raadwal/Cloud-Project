import * as nanoid from 'nanoid';
const neo4j = require('neo4j-driver');

import authorModel from './author';
import bookModel from './book';
import tagModel from './tag';
import userModel from './user';

const authorQuantity = 50;
const userQuantity = 250;
const maxTagsPerBook = 5;


const names = ["Lina", "Oliwier", "Abdul", "Iestyn", "Chiara",
                "Xander", "Eshal", "Bryan", "Cassandra", "Christian",
                "Bernard", "Grayson", "Lee", "Donald", "Mason", "Lennox",
                "Harmony", "Marnie", "Hanna", "Sebastian", "Nathanael",
                "Anya", "Frankie", "Libbie", "Kenny", "Heidi",
                "Paula", "Kirsten", "Cleo", "Shanice", "Ida", 
                "Silas", "Harun", "Rajan", "Alesha", "Alex",
                "Davina", "Faye", "Sahar", "Harris", "Harun",
                "Aadam", "Nathan", "Lilia", "Tina", "Arthur",
                "Luther", "Neha", "Cai", "Beau", "Vivian"];

const surnames = ["Nelson", "Wyatt", "Diaz", "Matthews", "Peterson", 
                    "Tanner", "Reeves", "Pace", "Cochran", "Mcdonald", 
                    "Rocha", "Wilcox", "Randall", "Calhoun", "Gilbert", 
                    "Romero", "Howard", "Pugh", "Friedman", "Johnson",
                    "Hester", "Key", "Fowler", "Thompson", "Luna", 
                    "Alexander", "Ortiz", "Goodman", "Petty", "Green", 
                    "Moyer", "Chen", "Yang", "Patton", "Munoz",
                    "Beasley", "Levine", "Huang", "Hampton", "Donaldson", 
                    "Odonnell", "Lyons", "Woods", "Clayton", "Simpson", 
                    "Mcclain", "Avery", "Mcgrath", "Hudson", "Nichols"];

const titles = ["Isle of Argus", "The Revenant Land", "Fire and the Princess",
                "The Salt of the Isle", "Cleric's Legacy", "Bard's Coming",
                "Vison of Evil", "Taste of Wolves", "The Beast in the Portrait",
                "The Mannequin in the Dusk", "Lonely Angel", "Marked for Sorrow",
                "Case of the Invisible Lynx", "The Shattered Corpse", "Case of the Blue Monkey",
                "Secret of the Quiet Porter", "Sign of the Thirteenth Turnip", "The Stolen Bluebird",
                "The Dynasty of the Plant People", "Sirius Recoiling", "Nebula Returning",
                "The Coming of Hope", "Avalon Descending", "Eclpise of Mercury",
                "Crimson Hound", "White Noon", "The Man in the Vale",
                "Angel of Dawn", "The Revenant Heavens", "Smoke and the Elixir",
                "Ark Burning", "Day of Nebula", "Zenith of Venus"];
  
const tags = ["Crime", "Fantasy", "Mystery", "Sci-fi", "Horror",
                "Classics", "Travel", "Thriller", "Psychology", "Romance",
                "Drama", "Historical fiction", "Suspense", "Satire", "Western"];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};

const addAuthorsData = async () => {
    for(let i = 0; i < authorQuantity; i++) {
        const name = names[getRandomInt(0, names.length)];
        const surname = surnames[getRandomInt(0, surnames.length)];
        const age = getRandomInt(18, 101)
        
        const newAuthor = {
            name: name,
            surname: surname,
            age: age
        };

        await authorModel.create(newAuthor);
    }
};

const addBooksData = async () => {
    for(let i = 0; i < titles.length; i++) {
        const title  = titles[i];
        const isbnGenerator = () => {
            let value = "";

            for(let j = 0; j < 10; j++)
            {
                value += getRandomInt(0, 10);
            }

            return value;
        };

        const isbn = isbnGenerator();
        const year = getRandomInt(1900, 2023);

        const newBook = {
            title: title,
            isbn: isbn,
            year: year
        };

        await bookModel.create(newBook);
    }
};

const addTagsData = async () => {
    for(let i = 0; i < tags.length; i++)
    {
        const name = tags[i];

        const newTag = {
            name: name,
        };

        await tagModel.create(newTag);
    }
};

const addUsersData = async () => {
    for(let i = 0; i < userQuantity; i++) {
        const name = names[getRandomInt(0, names.length)];
        const surname = surnames[getRandomInt(0, surnames.length)];
        const nickname = name.substring(0, 3) + surname.substring(0, 3);
        const email = nickname + "@email.com";
        const password = nanoid.nanoid(getRandomInt(10, 21));
        
        const newUser = {
            name: name,
            surname: surname,
            nickname: nickname,
            email: email,
            password: password
        };

        await userModel.create(newUser);
    }
};

const createRatings = async () => {
    const users = await userModel.findAll();
    const books = await bookModel.findAll();
    let booksIdxs = [];
    
    for (let i = 0; i < users.length; i++) {
        const userId = users[i]._id;
                
        for(let j = 0; j < books.length / 5; j++) {
            const bookIdx = getRandomInt(0, books.length);
            if(!booksIdxs.includes(bookIdx)) {
                booksIdxs.push(bookIdx);

                const bookId = books[bookIdx]._id;
                const score = getRandomInt(0, 11);
                
                const book = {
                    bookId: bookId,
                    score: score
                }

                await userModel.rateBook(userId, book);
            }
        }

        booksIdxs = [];
    }
};

const addAuthors = async () => {
    const authors = await authorModel.findAll();
    const books = await bookModel.findAll();

    for (let i = 0; i < books.length; i++) {
        const bookId = books[i]._id;

        const authorIdx = getRandomInt(0, authors.length);
        const authorId = authors[authorIdx]._id;

        await authorModel.addBook(authorId, bookId)
    }
};

const addTags = async () => {
    const books = await bookModel.findAll();
    const tags = await tagModel.findAll();
    let tagsIdxs = [];
    
    for (let i = 0; i < books.length; i++) {
        const bookId = books[i]._id;
                
        const tagQuantity = getRandomInt(1, maxTagsPerBook + 1);

        for(let j = 0; j < tagQuantity; j++) {
            const tagIdx = getRandomInt(0, tags.length);

            if(!tagsIdxs.includes(tagIdx)) {
                tagsIdxs.push(tagIdx);

                const tagId = tags[tagIdx]._id;
                await bookModel.addTag(bookId, tagId);
            }
        }

        tagsIdxs = [];
    }
};

const addData = async () => {
    await addAuthorsData()
    await addBooksData()
    await addTagsData()
    await addUsersData()
    await createRatings()
    await addAuthors()
    await addTags()

    return "Data added";
};

const deleteData = async () => {
    const {
        NEO4J_URI,
        NEO4J_USERNAME,
        NEO4J_PASSWORD,
    } = process.env;

    const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));
    const session = driver.session();

    await session.run(`MATCH (n) -[r] -> () DELETE n, r`);
    await session.run('MATCH (n) DELETE n');

    return "Data deleted";
}

export default {
    addData,
    deleteData
}