const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    value: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    }
});

module.exports = model('ConsumptionCategory', schema);
