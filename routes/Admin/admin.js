const express = require("express");
const admincontroller = require("../../controller/Admin/admincontroller");
const app = express.Router();

app.post("/registration", admincontroller.registration);

app.get("/getalladmin", admincontroller.getalladmin);

app.get("/getadmin", admincontroller.getadmin);

app.put("/updateadmin/:id", admincontroller.updateadmin);

app.post("/login", admincontroller.login)

module.exports = app;