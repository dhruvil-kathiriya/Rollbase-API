const express = require("express");
const managercontroller = require("../../controller/Manager/managercontroller");
const app = express.Router();

app.post("/addmanager", managercontroller.addmanager);

module.exports = app;