const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

var tourSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tourGuide: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
