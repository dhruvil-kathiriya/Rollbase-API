const mongoose = require("mongoose");

const adminschema = mongoose.Schema({
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

const admin = mongoose.model('admin', adminschema);

module.exports = admin;