const mongoose = require("mongoose")
const { Schema } = mongoose;

const team = new Schema({
    name: {
        type: String,
        require: true
    },
    position: {
        type: Number,
        require: true
    },
    conference:{
        type: String,
        require: true
    }
})

module.exports = team;