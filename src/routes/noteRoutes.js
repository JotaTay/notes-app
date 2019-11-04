const express = require('express');
const noteRouter = express.Router();
const noteController = require('../controllers/noteController');
const debug = require('debug')('app:noteRoutes');

router = (nav) => {
    const { displayHome, oauth, oauth_callback, clear } = noteController(nav);
    // noteRouter.use(middleware);
    noteRouter.route('/').get( displayHome );
    noteRouter.route('/oauth').get( oauth );
    noteRouter.route('/oauth_callback').get( oauth_callback );
    // noteRouter.route('/oauth').get( authenticate );
    return noteRouter;
};

module.exports = router;
