const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
const methodOverride = require('method-override');

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))

// routes
app.use(require('./routes/index'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
})


module.exports = app;