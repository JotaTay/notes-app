const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
// the authRouter handles user authentication
function router(nav) {
    // the signup route
    authRouter.route('/signup').post((req, res) => {
        // assigns username and password from the request body,
        // submitted by the form.
        const {username, password} = req.body;
        // the url of the mongodb in a local docker container
        const url = 'mongodb://localhost:27017';
        // the database
        const dbName = 'libraryApp';
        debug(req.body);
        // addUser IFFE
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
                // http://www.passportjs.org/docs/login/
                req.login(results.ops[0], () => {
                    res.redirect('/auth/profile');
                });
                  // todo: - add logout
            } catch (err) {
                debug(err);
            }
        }())

    });

    authRouter.post('/signin', passport.authenticate('local', 
        { successRedirect: '/',
        failureRedirect: '/401' }));

     authRouter.route('/profile')
         .get(function(req, res) {
            res.redirect('/'); 
        });
        
    return authRouter;
}

module.exports = router;
