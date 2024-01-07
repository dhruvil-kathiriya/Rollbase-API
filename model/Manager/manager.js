const mongoose = require("mongoose");
// const path = require('path');
// const managerImagePath = '/uploads/Manager';
// const multer = require('multer');

const managerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    // managerImage : {
    //     type : String
    // },
    adminIds: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
});

// ManagerSchema.statics.managerImageModel = managerImagePath;

// const managerImageStore = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null,path.join(__dirname,"../..",managerImagePath));
//     },
//     filename : function(req,file,cb){
//         cb(null,file.fieldname+'-'+Date.now());
//     }
// })

// ManagerSchema.statics.managerUploadImage = multer({storage:managerImageStore}).single('managerImage');

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
