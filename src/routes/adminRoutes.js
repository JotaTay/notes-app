const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
    {
        title: 'The Antichrist',
        genre: 'Philosophy',
        author: 'Nietzche',
        read: false
    },
    {
        title: 'Paradise Lost',
        genre: 'Poetry',
        author: 'Milton',
        read: true
    }
];

function router(nav){
    adminRouter.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    console.log('Connected correctly to the server');

                    const db = client.db(dbName);

                    const response = await db.collection('books').insertMany(books);

                } catch (err){
                    debug(err.stack);
                }

                client.close();
                }());
            res.send('inserting books');
        });
    return adminRouter;
}

module.exports = router;
