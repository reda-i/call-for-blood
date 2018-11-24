const zipkin = require('appmetrics-zipkin');
const prometheus = require('appmetrics-prometheus');
const appName = require('./../package').name;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const log4js = require('log4js');
const request = require('request');

const logger = log4js.getLogger(appName);
const app = express();

app.use(express.status(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

require('./routes/auth')(app);

const port = process.env.PORT || 3100;

logger.info(`Running on ${process.env.BASE_PATH}:${port},
connecting to ${process.env.MONGO_URL}`);

mongoose.connect(process.env.MONGO_URL, (uris,connection) => {
    connection.onOpen();
    app.listen(port, () => {
        logger.info(`Call For Blood running on port: ${port}`);
    });
});
