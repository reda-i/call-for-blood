'use strict';

const mongoose = require('mongoose');
const pointSchema = new mongoose.Schema({
    coordinates: {
        required: true,
        type: [Number]
    },
    type: {
        enum: ['Point'],
        required: true,
        type: String
    }
});

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    isHospital: {
        required: true,
        type: Boolean
    },
    location: {
        required: true,
        type: pointSchema
    },
    password: {
        required: true,
        type: String
    },
    phoneNumber: {
        type: Number
    },
    username: {
        required: true,
        type: String,
        unique: true
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
