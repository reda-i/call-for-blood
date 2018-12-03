'use strict';

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if (req.hasOwnProperty('headers') &&
        req.headers.hasOwnProperty('authorization')) {
        try {
            req.user = jwt.verify(
                req.headers['authorization'],
                process.env.SECRET
            );
        } catch (err) {
            return res.status(401).json({
                err: process.env.NODE_ENV === 'production'
                    ? null
                    : err,
                msg: 'Failed to authenticate token!'
            });
        }
    } else {
        return res.status(401).json({
            msg: 'No token!'
        });
    }

    return next();
};
