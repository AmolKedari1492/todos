const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./index.router');
const bodyParser = require('body-parser');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

let options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }};
let mongoUrl = 'mongodb://test:test@ds239368.mlab.com:39368/heroku_62qlrkq8';
mongoose.connect(mongoUrl, options);

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
    console.log('Connected : ')
    // Wait for the database connection to establish, then start the app.
});

app.use('/', router);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
