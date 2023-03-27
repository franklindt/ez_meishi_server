const mongoose = require('mongoose');

const { Schema } = mongoose;

const CardSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    ref: {
        type: String,
        required: true,
        unique: true
    },
    qr: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: true,
        unique: true
    },
    cell: {
        type: Number,
        required: true,
        unique: true
    },
    fax: {
        type: Number,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;