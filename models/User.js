const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    login: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

module.exports = model('User', schema);
