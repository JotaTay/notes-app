const express = require('express');
const noteRouter = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const noteController = require('../controllers/noteController');
const evernoteService = require('../services/evernoteService');
const debug = require('debug')('app:bookRoutes');

router = (nav) => {
    const { authorize, middleware} = noteController(evernoteService, nav);
    noteRouter.use(middleware);
    noteRouter.route('/').get(authorize);
    return noteRouter;
};

module.exports = router;
