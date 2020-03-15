const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        required: true,
        type: Number
    },
    category: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Consumption', schema);
