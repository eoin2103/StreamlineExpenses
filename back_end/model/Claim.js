const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({

    title:{ 
        type: String,
        required: true,
        maxLength: 255
    },
    description:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    amount:{
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        
    },
    evidence: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: String,
    }

});

module.exports = mongoose.model('Claim', claimSchema);