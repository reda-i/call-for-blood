const zipkin = require('appmetrics-zipkin');
const prometheus = require('appmetrics-prometheus');
const appName = require('./../package').name;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const log4js = require('log4js');
//TODO: Add http request API

const logger = log4js.getLogger(appName);
const app = express();

app.use(express.status(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

require('./routes/auth')(app);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`Express app is listening on ${port}`);
});