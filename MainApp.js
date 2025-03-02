// importing required modules
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

// creating an express app
const app = express();

// setting the middleware
app.use(require(path.join(__dirname, 'middleware', 'Compression.js')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);
app.use(require(path.join(__dirname, 'middleware', 'RequestLogger.js')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// setting the security
app.use(require(path.join(__dirname,'security', 'IPBlacklist.js')));
app.use(require(path.join(__dirname,'security', 'RequestSizeLimiter.js')));
app.use(require(path.join(__dirname,'security', 'RateLimiter.js')));
app.use(require(path.join(__dirname,'security', 'XSSProtection.js')));

// setting the routes
app.use('/player', require(path.join(__dirname,'routes', 'GrowtopiaWebview.js')));
app.use('/growtopia', require(path.join(__dirname,'routes', 'GrowtopiaGame.js')));

// setting the static files
app.use(express.static(path.join(__dirname, 'public')));

// exposing the app
module.exports = app;