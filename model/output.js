const mongoose = require('mongoose');
const outputModel = new mongoose.Schema({
    name: {
        type: String, required: true, 
    },
    phone_no: {
        type: Number, required: true, 
    },
    age: {
        type: Number, required: true,
    },
    email: {
        type: String, required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model('output', outputModel);
 