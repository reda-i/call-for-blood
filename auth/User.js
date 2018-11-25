'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    password: {
        type: String
    },
    email: String
});
const User = mongoose.model('myuser', userSchema);
module.exports = User;
