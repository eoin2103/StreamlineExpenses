const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({

    title:{ 
        type: String,
        maxLength: 255
    },
    description:{
        type: String,
        max: 255,
        min: 6
    },
    amount:{
        type: String,
    },
    date: {
        type: Date,
        
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
    },
    status: {
        type: String
    }

});

module.exports = mongoose.model('Claim', claimSchema);