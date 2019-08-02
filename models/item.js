const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// targetPrice and currentPrice are Strings; the Joi library validates them as decimals

const userMetaSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    targetPrice: {
        type: String,
        required: true
    },
    sendAlerts: {
        type: Boolean,
        required: true
    }
});

const itemSchema = new Schema({
    uri: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: [userMetaSchema],
        required: true,
    },
    title: {
        type: String
    },
    currentPrice: {
        type: String
    },
    lastTimeChecked: {
        type: String
    }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;