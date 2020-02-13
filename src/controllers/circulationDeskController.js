const {MongoClient, ObjectId} = require('mongodb');
const debug = require('debug')('app:circulationDeskController');

// the book controller has two functions: getIndex, getById, and middleware.
// it gets passed the BookService and the nav. Both functions respond
// with a call to render their respective views.
function circulationDeskController(bookService, nav) {
    //Mock JSON for inserting book details into MongoDB 
    const booklist = [
        {
            title: 'Memories, Dreams, Reflections',
            genre: 'Autobiographical',
            author: 'Carl Gustave Jung',
            bookId: 612188,
            read: false
        },
    ];
    
    // // TODO: connect to Goodreads and query my Want to 'Read, Have Read, etc.''
    // const addBooks = (req, res) => {
    //     const url = 'mongodb://localhost:27017';
    //     const dbName = 'libraryApp';
    //     (async function mongo() {
    //         let client;
    //         try {
    //             client = await MongoClient.connect(url);
    //             console.log('Connected correctly to the server');
    //             const db = client.db(dbName);
    //             const response = await db.collection('books').insertMany(booklist);
    //         } catch (err){
    //             debug(err.stack);
    //         }
    //         client.close();
    //         }());
    //         res.send('inserting books');
    //     };
    // getBookIndex connects to a MongoDb instance,retrieves the books, and renders view.
    function getBookList(req, res) { 
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected correctly to the server');
                const db = client.db(dbName);
                // inserts mock object into DB for development
                // thsi object will eventually be built from goodreads queries.
                db.collection('books').insertMany(booklist);

                const collection = await db.collection('books');
                const books = await collection.find().toArray();
                // the server responds by rendering the bookListView with the nav and found books
                res.render(
                    'bookListView',
                    {
                        nav,
                        title: 'Books',
                        books
                    }
                );
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        })();
    }

    //getById connects to the database, retrieves the book collection, finds a book by ID, and renders that book with bookView.ejs
    function getBookById(req, res) {
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
                        title: 'Book Details',
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

    //this controller returns these three functions
    return {
        // addBooks,
        getBookList,
        getBookById,
        middleware
    }
}

module.exports = circulationDeskController;
