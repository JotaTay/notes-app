const express = require('express');
const circulationDeskRouter = express.Router();
const circulationDeskController = require('../controllers/circulationDeskController');
const bookService = require('../services/goodreadsService');
const debug = require('debug')('app:circulationDeskRoutes');

const router = (nav) => {

// Passing bookService.
const { getBookList, getBookById, middleware} = circulationDeskController(bookService, nav);
	// middleware needs out non logged in users
    // circulationDeskRouter.use(middleware);
    circulationDeskRouter.get('/', getBookList);
    circulationDeskRouter.get('/:id', getBookById);

    return circulationDeskRouter;
};

module.exports = router;
