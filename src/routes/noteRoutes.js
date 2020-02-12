const express = require('express');
const noteRouter = express.Router();
const noteController = require('../controllers/noteController');
const debug = require('debug')('app:noteRoutes');
const passport = require('passport');

router = (nav) => {
    const { displayHome, oauth, oauth_callback, getNotes, clear } = noteController(nav);
    // noteRouter.use(middleware);
    noteRouter.get('/', displayHome );
    // noteRouter.route('/oauth').get( oauth );
    // noteRouter.route('/oauth_callback').get( oauth_callback );
    // noteRouter.get('/notes/auth', passport.authenticate('evernote'));
    noteRouter.get('/notes', getNotes );
    return noteRouter;
};

module.exports = router;
