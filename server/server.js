const zipkin = require('appmetrics-zipkin');
const prometheus = require('appmetrics-prometheus');
const appName = require('./../package').name;
const express = require('express');
const log4js = require('log4js');
const logger = log4js.getLogger(appName);
const app = express();

app.get('/', (req,res) =>{
    res.send('Hello World');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`Express app is listening on ${port}`);
});