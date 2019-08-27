const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signup').get((req, res) => {
        res.render('signup', {
            nav,
            title: 'sign up'
        });
    }).post((req, res) => {
        const {username, password} = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        debug(req.body);
        //create user
        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to server');

                const db = client.db(dbName);

                const col = db.collection('users');
                const user = {username, password};
                const results = await col.insertOne(user);
                debug(results);
                // todo: - add logout
                req.login(results.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            } catch (err) {
                debug(err);
            }
        }())

    });
    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signIn', {
                nav,
                title: 'sign In'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/')
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });
    return authRouter;
}

module.exports = router;
