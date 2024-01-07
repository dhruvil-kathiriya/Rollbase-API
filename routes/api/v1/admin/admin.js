const express = require("express");

const Passport = require("passport");

const adminController = require("../../../../controller/api/v1/admin/adminController");

// const Registration = require("../../../../model/admin/Registration");

const routes = express.Router();

routes.post("/insertAdminData", adminController.insertAdminData);

routes.post("/loginAdmin", adminController.loginAdmin);

routes.get(
  "/viewAllAdmin",
  Passport.authenticate("jwt", { failureRedirect: "/admin/failLogin" }),
  adminController.viewAllAdmin
);

routes.get("/failLogin", async (req, res) => {
  return res
    .status(400)
    .json({ msg: "Invalid username or password", status: 0 });
});

routes.get(
  "/viewAdminProfile",
  Passport.authenticate("jwt", { failureRedirect: "/admin/failLogin" }),
  adminController.viewAdminProfile
);

routes.post(
  "/editProfile",
  Passport.authenticate("jwt", { failureRedirect: "/admin/failLogin" }),
  adminController.editProfile
);

routes.delete(
  "/deleteAdmin",
  Passport.authenticate("jwt", { failureRedirect: "/admin/failLogin" }),
  adminController.deleteAdmin
);

routes.get(
  "/viewAllManager",
  Passport.authenticate("jwt", { failureRedirect: "/admin/failLogin" }),
  adminController.viewAllManager
);

routes.use("/manager", require("../manager/manager"));

module.exports = routes;
