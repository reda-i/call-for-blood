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


app.post('/api/user/create', (req,res) => {

});

app.post('/api/user/authenticate', (req,res) => {

});

module.exports = app;
