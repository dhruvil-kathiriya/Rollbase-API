const bcrypt = require("bcrypt");

const jwtData = require("jsonwebtoken");

const Admin = require("../../../../model/admin/Admin");

const Manager = require("../../../../model/manager/Manager");

module.exports.insertAdminData = async (req, res) => {
  try {
    let checkmail = await Admin.findOne({ email: req.body.email });
    if (checkmail) {
      return res.status(400).json({ msg: "Email already exist", status: 0 });
    } else {
      if (req.body.password == req.body.confirm_pass) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let adminData = await Admin.create(req.body);
        if (adminData) {
          return res.status(200).json({
            msg: "Data inserted successfully",
            status: 1,
            adminData: adminData,
          });
        } else {
          return res.status(200).json({ msg: "Data not insert", status: 0 });
        }
      } else {
        return res.status(200).json({ msg: "Password not match", status: 0 });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong", status: 0 });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    let checkmail = await Admin.findOne({ email: req.body.email });
    if (checkmail) {
      if (bcrypt.compare(req.body.password, checkmail.password)) {
        let token = jwtData.sign({ adminData: checkmail }, "JWTAPI", {
          expiresIn: "1h",
        });
        return res.status(200).json({
          msg: "Login successfully",
          status: 1,
          token: token,
        });
      } else {
        return res.status(200).json({ msg: "Invalid Password", status: 0 });
      }
    } else {
      return res.status(200).json({ msg: "Email not match", status: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong", status: 0 });
  }
};

module.exports.viewAllAdmin = async (req, res) => {
  try {
    let allData = await Admin.find({});
    if (allData) {
      return res.status(200).json({
        msg: "Here is Admin data",
        status: 1,
        allData: allData,
      });
    } else {
      return res.status(200).json({ msg: "Admin data not found", status: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong", status: 0 });
  }
};

module.exports.viewAdminProfile = async (req, res) => {
  try {
    let adminData = req.user;
    // console.log(adminData);
    if (adminData) {
      return res.status(200).json({
        msg: "Here is your profile data",
        status: 1,
        adminData: adminData,
      });
    } else {
      return res.status(200).json({ msg: "No profile data found", status: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong", status: 0 });
  }
};

module.exports.editProfile = async (req, res) => {
  try {
    if (req.query) {
      if (req.body) {
        let profileData = await Admin.findById(req.query.id);
        if (profileData) {
          let oldData = await Admin.findByIdAndUpdate(req.query.id, req.body);
          let newData = await Admin.findById(req.query.id);
          if (oldData) {
            return res.status(200).json({
              msg: "Data edited successfully",
              status: 1,
              newData: newData,
            });
          } else {
            return res.status(200).json({ msg: "Data not edited", status: 0 });
          }
        } else {
          return res.status(200).json({ msg: "Data not found", status: 0 });
        }
      } else {
        return res.status(200).json({ msg: "Invalid field", status: 0 });
      }
    } else {
      return res.status(200).json({ msg: "Invalid id", status: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong", status: 0 });
  }
};

module.exports.viewAllManager = async (req, res) => {
  try {
    let managerData = await Manager.find({});
    if (managerData) {
      return res.status(200).json({
        msg: "Here is all manager data",
        status: 1,
        managerData: managerData,
      });
    } else {
      return res
        .status(200)
        .json({ msg: "Magnager data not found", status: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Something went wrong", status: 0 });
  }
};

module.exports.deleteAdmin = async (req, res) => {
  try {
    let aData = await Admin.findById(req.query.id);
    if (aData) {
      let deleteData = await Admin.findByIdAndDelete(req.query.id);
      if (deleteData) {
        return res.status(200).json({
          msg: "Admin deleted successfully",
          status: 1,
          deleteData: deleteData,
        });
      } else {
        return res.status(200).json({ msg: "Admin not deleted", status: 0 });
      }
    } else {
      return res.status(200).json({ msg: "Admin not found", status: 0 });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json({ msg: "Something went wrong", status: 0 });
  }
};
