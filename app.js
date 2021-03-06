const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const get = require('lodash.get');


const app = express();
const port = process.env.PORT || 3000;

const nav =  [
    { link: '/library', title: 'books' },
    { link: '/notes', title: 'notes' }
];
let username = '';

const circulationDeskRouter = require('./src/routes/circulationDeskRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);
const notesRouter = require('./src/routes/noteRoutes')(nav);


// Mounts the specified middleware function or functions at the specified path:
// the middleware function is executed when the base of the requested path matches path.
// https://expressjs.com/en/4x/api.html#app.use
app.use(session({
    secret: 'library',
    resave: false,
    saveUnititialized: true
}));

require('./src/config/passport.js')(app);
// app.use('/library', circulationDeskRouter);
// app.use('/auth', authRouter);
// app.use('/notes', notesRouter);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js/')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/library', circulationDeskRouter);
app.use('/auth', authRouter);
app.use('/notes', notesRouter);


const isLoggedIn = (req, res, next) => {
    console.log('username', get(req.user, 'username', ''));
    username = get(req.user, 'username', '');
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}

app.get('/', isLoggedIn, (req, res) => {
      res.render(
        'index',
        {
            nav,
            title: 'Home',
            username: username
        });
    });

app.get('/login', (req, res) => {
  res.render(
    'loginView',
    {
    });
});

app.get('/401', (req, res) => {
  res.render(
    '401',
    {
    });
});

app.use(function(error, req, res, next) {
  // Any request to this server will get here, and will send an HTTP
  // response with the error message 'woops'
  res.json({ message: error.message });
});

app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
});
