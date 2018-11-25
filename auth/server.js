'use strict';

const mongoose = require('mongoose');
const appName = require('./package').name;
const log4js = require('log4js');
require('dotenv').config({silent: true, path: `${__dirname}/.env`});


const logger = log4js.getLogger(appName);
const server = require('./app');


const port = process.env.PORT || 3100;
logger.info(`Running on ${process.env.BASE_PATH}:${process.env.PORT},
 connecting to ${process.env.MONGO_URL}`)

mongoose.connect(process.env.MONGO_URL, function (ignore, connection) {
    connection.onOpen();
    server.listen(process.env.PORT, function () {
        logger.info('Server running on port: %d', port);
    });
});
