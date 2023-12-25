const mongoose = require("mongoose");

const managerschema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const manager = mongoose.model('manager', managerschema);

module.exports = manager;