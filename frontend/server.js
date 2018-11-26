require('dotenv').config({
    silent: true,
    path: `${__dirname}/.env`
});
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

app.use(express.static(`${__dirname}/build`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/test', (req, res) => {
    res.send('welcome to frontend router');
});
require('./routes/auth')(app);

const port = process.env.NODE_ENV === 'production'
    ? process.env.PORT
    : process.env.SERVER_PORT;

app.listen(port, () => {
    logger.debug(`Call For Blood running on port: ${port}`);
});

process.on('SIGINT', ()=> process.exit(0));