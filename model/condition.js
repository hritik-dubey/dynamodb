const mongoose = require('mongoose');
const conditionModel = new mongoose.Schema({
    field: {
        type: String, required: true, 
    },
    criteria: {
        type: String, required: true, 
    },
    value: {
        type: String, required: true,
    },
    ischeck:{
        type:Boolean , default:false,
    }
}, { timestamps: true })

module.exports = mongoose.model('condition', conditionModel);
