'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const User = require('./mongoose/User');
const jwt = require('jsonwebtoken');
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

const sendUnknownErrorMsg = (err, res) => res.status(500).
    send({
        err: process.env.NODE_ENV === 'production'
            ? null
            : err,
        msg: 'An unexpected error occured, please try again in a few seconds',
        obj: null
    });

app.post(
    '/api/auth/create',
    [
        check('email').exists().
            isEmail().
            normalizeEmail(),
        check('isHospital').exists().
            isBoolean(),
        check('location').exists(),
        check('password').exists().
            isString().
            isLength({ min: 8 }).
            trim(),
        check('phoneNumber').exists().
            isMobilePhone(),
        check('username').exists().
            isString().
            trim()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                err: errors.mapped({ onlyFirstError: true })
            });
        }
        const newUser = {
            email: req.body.email,
            isHospital: req.body.isHospital,
            location: req.body.location,
            // eslint-disable-next-line no-sync
            password: bcrypt.hashSync(req.body.password, 8),
            phoneNumber: req.body.phoneNumber,
            username: req.body.username
        };

        return User.findOne({
            $or:
                [
                    { email: newUser.email },
                    { username: newUser.username }
                ]
        }, (err, existingUser) => {
            if (err) {
                return sendUnknownErrorMsg(err, res);
            }
            if (existingUser) {
                return res.status(402).send({
                    err: null,
                    msg: `This username or email have already been registered`,
                    obj: null
                });
            }

            return User.create(newUser, (createErr, user) => {
                if (createErr) {
                    return sendUnknownErrorMsg(createErr, res);
                }
                const token = jwt.sign(
                    user.toJSON(),
                    process.env.SECRET,
                    { expiresIn: 604800 }
                );

                return res.status(200).send({
                    err: null,
                    msg: 'User has been successfully signed up',
                    obj: user,
                    token
                });
            });
        });
    }
);

app.post(
    '/api/auth/login',
    [
        check('username').exists().
            isString().
            trim(),
        check('password').exists().
            isString().
            trim()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                err: errors.mapped({ onlyFirstError: true })
            });
        }

        return User.findOne({
            username: req.body.username
        }, (err, existingUser) => {
            if (err) {
                return sendUnknownErrorMsg(err, res);
            }
            if (!existingUser) {
                return res.status(401).send({
                    err: null,
                    msg: 'Login failed, No user exists' +
                        ' with this username',
                    obj: null
                });
            }
            // eslint-disable-next-line no-sync

            return bcrypt.compare(
                req.body.password,
                existingUser.password,
                (compareError, comparisonResult) => {
                    if (compareError) {
                        return sendUnknownErrorMsg(compareError, res);
                    }
                    if (!comparisonResult) {
                        return res.status(401).send({
                            err: null,
                            msg: 'Login failed, password is' +
                                ' incorrect',
                            obj: null
                        });
                    }
                    delete existingUser.password;
                    const token = jwt.sign(
                        existingUser.toJSON(),
                        process.env.SECRET,
                        { expiresIn: 604800 }
                    );

                    return res.status(200).send({
                        err: null,
                        msg: `Login successful`,
                        obj: existingUser,
                        token
                    });

                }
            );
        })
    }
);
module.exports = app;