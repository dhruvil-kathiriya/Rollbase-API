const express = require("express");

const routes = express.Router();

const Passport = require("passport");

const managerController = require("../../../../controller/api/v1/manager/managerController");

routes.post(
    "/insertManagerData",
    Passport.authenticate("jwt", {
        failureRedirect: "/admin/manager/failLogin",
    }),
    managerController.insertManagerData
);

routes.post("/loginManager", managerController.loginManager);

routes.get(
    "/viewManagerProfile",
    Passport.authenticate("managerLogin", {
        failureRedirect: "/admin/manager/failLogin",
    }),
    managerController.viewManagerProfile
);

routes.put(
    "/editManagerProfile",
    Passport.authenticate("managerLogin", {
        failureRedirect: "/admin/manager/failLogin",
    }),
    managerController.editManagerProfile
);

routes.delete(
    "/deleteManager",
    Passport.authenticate("managerLogin", {
        failureRedirect: "/admin/manager/failLogin",
    }),
    managerController.deleteManager
);

routes.get(
    "/viewAllUser",
    Passport.authenticate("managerLogin", {
        failureRedirect: "/admin/manager/failLogin",
    }),
    managerController.viewAllUser
);

routes.get("/faillogin", async (req, res) => {
    return res.status(400).json({ msg: "invalid Login", status: 0 });
});

module.exports = routes;
