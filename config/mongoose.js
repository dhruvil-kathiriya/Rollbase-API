const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/AMU_API');

const db = mongoose.connection;

db.once('open', function (error) {
    if (error) console.log(error)

    console.log("DB Connected");
});

module.exports = db;