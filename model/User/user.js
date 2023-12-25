const mongoose = require("mongoose");

const userschema = mongoose.Schema({
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

const user = mongoose.model('user', userschema);

module.exports = user;