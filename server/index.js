/*
    IMPORTS
*/
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan')
const connectToMongoDB = require('./db/mongodb');
require('dotenv').config();

/*
    MIDDLEWARE
*/
// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// logs requests to the server
app.use(logger('dev'))

/*
    ROUTES
*/
const moviesRouter = require('./routes/movies');
const commentsRouter = require('./routes/comments');

app.use('/movies', moviesRouter);
app.use('/comments', commentsRouter);

/*
    POWER
*/
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);

    connectToMongoDB();
});