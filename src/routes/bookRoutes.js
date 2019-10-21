const express = require('express');
const bookRouter = express.Router();
const {MongoClient, ObjectId} = require('mongodb');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');
const debug = require('debug')('app:bookRoutes');

function router(nav) {
// setting constant from the returns of functions in bookController.
// Passing bookService.
const { getIndex, getById, middleware} = bookController(bookService, nav);

    bookRouter.use(middleware);
    bookRouter.route('/').get(getIndex);
    bookRouter.route('/:id').get(getById);
    return bookRouter;
};

module.exports = router;
