const zipkin = require('appmetrics-zipkin');
const prometheus = require('appmetrics-prometheus');
const appName = require('./package').name;
const express = require('express');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const logger = log4js.getLogger(appName);
logger.level = process.env.NODE_ENV === 'production'
    ? 'fatal'
    : 'debug';
const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/auth')(app);

const port = process.env.PORT || 3100;

app.listen(port, () => {
    logger.info(`Call For Blood running on port: ${port}`);
});