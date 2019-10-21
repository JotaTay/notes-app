const {MongoClient, ObjectId} = require('mongodb');
const debug = require('debug')('app:bookController');

// the book controller has two functions: getIndex, getById, and middleware.
// it gets passed the BookService and the nav. Both functions respond
// with a call to render their respective views
function bookController(bookService, nav) {
    // getIndex connects to a MongoDb instance. It inserts a mock book list
    // and renders the books it finds in a collection using the bookListView
    function getIndex(req, res) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        const booklist = [
            {
                title: 'Memories, Dreams, Reflections',
                genre: 'Autobiographical',
                author: 'Carl Gustave Jung',
                bookId: 612188,
                read: false
            },
        ];

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to the server');
                const db = client.db(dbName);
                db.collection('books').insertMany(booklist);
                const collection = await db.collection('books');
                const books = await collection.find().toArray();
                // the server responds by rendering the bookListView with the nav and found books
                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Library',
                        books
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        })();
    }
    //getById connects to the database and passes
    function getById(req, res) {
        const {id} = req.params;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to the server');

                const db = client.db(dbName);

                const collection = await db.collection('books');
                const book = await collection.findOne({ _id: new ObjectId(id) });
                debug(book);
                // the server responds by rendering the bookView with the nav and found book
                // using function from bookService
                book.details = await bookService.getBookById(book.bookId);
                    res.render(
                    'bookView',
                    {
                        nav,
                        title: 'Library',
                        book
                    });

            } catch (err) {
                debug(err.stack);
            }
        })();
    }
    // request, response, and next. If the user is specified in the request,
    // we move to the next route in the code, otherwise we redirect to '/'
    function middleware(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/')
        }
    }
    //the controller returns these three functions
    return {
        getIndex,
        getById,
        middleware
    }
}

module.exports = bookController;
