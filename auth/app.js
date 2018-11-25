'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/api/auth', (req, res) => {
    res.send('welcome to auth api');
});

app.post('/api/auth/create', (req, res) => {

});

app.post('/api/auth/authenticate', (req, res) => {

});

module.exports = app;
