/* eslint-disable max-len */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');
const verify = require('./jwt');
const nodemailer = require('nodemailer');
const Call = require('./mongoose/Call');
const User = require('./mongoose/User');
const EARTH_EQUATOR_LENGTH = 3963.2;

const app = express();
const transporter = nodemailer.createTransport({
    auth: {
        pass: process.env.MAILER_PASSWORD,
        user: process.env.MAILER_USER
    },
    service: process.env.MAILER_SERVICE
});


app.use(bodyParser.json());
app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
app.use(verify);
app.get('/api/call', (req, res) => {
    res.send('welcome to call api');
});

const sendUnknownErrorMsg = (err, res) => res.status(500).
    send({
        err: process.env.NODE_ENV === 'production'
            ? null
            : err,
        msg: 'An unexpected error occured, please try again in a few seconds',
        obj: null
    });

app.post(
    '/api/call',
    [
        check('title').exists().
            isString(),
        check('case').exists().
            isString()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                err: errors.mapped({ onlyFirstError: true })
            });
        }
        const newCall = {
            case: req.body.case,
            link: 'http://www.google.com/maps/place/' +
                `${req.user.location.coordinates[1]}` +
                `,${req.user.location.coordinates[0]}`,
            ownerId: req.user._id,
            title: req.body.title
        }

        return Call.create(newCall, (createErr, call) => {
            if (createErr) {
                return sendUnknownErrorMsg(createErr, res);
            }
            res.send({
                err: null,
                msg: 'call initiated successfully',
                obj: call
            });
            const maxDistance = 100;

            return User.find({
                location: {
                    $geoWithin: {
                        $centerSphere: [
                            req.user.location.coordinates,
                            maxDistance / EARTH_EQUATOR_LENGTH
                        ]
                    }
                }
            }, (findErr, users) => {
                if (findErr) {
                    return sendUnknownErrorMsg(findErr, res);
                }

                if (!users) {
                    return null;
                }

                return users.forEach((user) => {
                    transporter.sendMail({
                        from: 'callforblood-cfb@hotmail.com',
                        subject: call.title,
                        text: `
Hello ${user.username},
This is a notification to inform you that a hospital really needs your help.
Here is information about the case that needs your help.
                        
${call.case}
                    
Kindly find the location of the hospital in the following link

${call.link}

Regards,
The CFB Team`,
                        to: user.email
                    });
                });
            });
        });
    }
);

module.exports = app;
