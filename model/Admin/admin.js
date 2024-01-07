const mongoose = require("mongoose");

// const multer = require("multer");

// const path = require("path");

// const adminImagePath = "/uploads/adminImages";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
    },
    hobby: {
        type: Array,
    },
    message: {
        type: String,
    },
    managersIds: {
        type: Array,
        ref: "Manager",
    },
    // adminImage: {
    //     type: String,
    //
    // },
});

// const imageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, "../..", adminImagePath));
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now());
//     },
// });

// registrationSchema.statics.adminUplodedImage = multer({
//     storage: imageStorage,
// }).single("adminImage");

// registrationSchema.statics.imageModelPath = adminImagePath;

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
