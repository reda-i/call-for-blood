'use strict';

const mongoose = require('mongoose');
const appName = require('./package').name;
const log4js = require('log4js');
require('dotenv').config({
    path: `${__dirname}/.env`,
    silent: true
});


const logger = log4js.getLogger(appName);
logger.level = 'debug';
const server = require('./app');


const port = process.env.PORT || 3400;
mongoose.connect(process.env.MONGO_URL, function (ignore, connection) {
    connection.onOpen();
    server.listen(process.env.PORT, function () {
        logger.debug('Server running on port: %d', port);
    });
});

process.on('SIGINT', () => process.exit(0));
