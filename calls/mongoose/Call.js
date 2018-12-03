'use strict';

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const CallSchema = new mongoose.Schema({
    case: {
        required: true,
        type: String
    },
    link: {
        required: true,
        type: String
    },
    ownerId: {
        required: true,
        type: ObjectId
    },
    title: {
        required: true,
        type: String
    }
});
const Call = mongoose.model('Call', CallSchema);
module.exports = Call;
