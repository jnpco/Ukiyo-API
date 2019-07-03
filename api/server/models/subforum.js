const mongoose = require('mongoose');
mongoose.pluralize(null);

// COLLECTION NAMES
const { CN_USER } = require('./user');
const { CN_FORUM } = require('./forum');

const CN_SUBFORUM = "subforum";

const subforumSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    [CN_FORUM]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CN_FORUM
    },
    [CN_USER]: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: CN_USER
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    subject: {
        type: String,
        required: true,
        minlength: [5, "Subject must be 5 characters or more."],
        maxlength: [101, "Subject must be less than 100 characters."]
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    },
    dateDeleted: {
        type: Date,
    }
});

module.exports = {
    SUBFORUM: mongoose.model(CN_SUBFORUM, subforumSchema),
    CN_SUBFORUM
};