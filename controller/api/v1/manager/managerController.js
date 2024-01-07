const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");

const jwtManager = require("jsonwebtoken");

const Manager = require("../../../../model/manager/Manager");

const User = require("../../../../model/user/User");

const Admin = require("../../../../model/admin/Admin");

module.exports.insertManagerData = async (req, res) => {
    try {
        let checkmail = await Manager.findOne({ email: req.body.email });
        if (checkmail) {
            return res
                .status(200)
                .json({ msg: "Email already exist", status: 1 });
        } else {
            if (req.body.password == req.body.confirm_pass) {
                let loginPass = req.body.password;
                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.adminIds = req.user.id;
                let managerData = await Manager.create(req.body);
                if (managerData) {
                    // console.log(req.user.id);
                    let adminData = await Admin.findById(req.user.id);
                    adminData.managersIds.push(managerData.id);
                    await Admin.findByIdAndUpdate(req.user.id, adminData);
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: "chintanrajpara34@gmail.com",
                            pass: "fpqgfbckndvnplje",
                        },
                    });
                    const info = await transporter.sendMail({
                        from: "chintanrajpara34@gmail.com",
                        to: req.body.email,
                        subject: "Manager successfully registered",
                        text: "Here is your email and password to login.",
                        html: `<b>Email = ${req.body.email} </b></br></br><b>Password = ${loginPass}</b>`,
                    });
                    return res.status(200).json({
                        msg: "Data inserted successfully",
                        status: 1,
                        managerData: managerData,
                    });
                } else {
                    return res
                        .status(200)
                        .json({ msg: "Data not insert", status: 0 });
                }
            } else {
                return res
                    .status(200)
                    .json({ msg: "Password not match", status: 0 });
            }
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something Wrong", status: 0 });
    }
};

module.exports.loginManager = async (req, res) => {
    try {
        // console.log(req.body);
        let checkmail = await Manager.findOne({ email: req.body.email });
        if (checkmail) {
            if (await bcrypt.compare(req.body.password, checkmail.password)) {
                let token = jwtManager.sign(
                    { managerData: checkmail },
                    "Manager",
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    msg: "Login successfully",
                    status: 1,
                    token: token,
                });
            } else {
                return res
                    .status(200)
                    .json({ msg: "Invalid Password", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Email not match", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.viewManagerProfile = async (req, res) => {
    try {
        let data = await req.user;
        if (data) {
            return res
                .status(200)
                .json({ msg: "Manager Profile Data", status: 1, data: data });
        } else {
            return res.status(200).json({ msg: "Somthig Wrong", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.editManagerProfile = async (req, res) => {
    try {
        if (req.query) {
            if (req.body) {
                let profileData = await Manager.findById(req.query.id);
                if (profileData) {
                    let oldData = await Manager.findByIdAndUpdate(
                        req.query.id,
                        req.body
                    );
                    let newData = await Manager.findById(req.query.id);
                    if (oldData) {
                        return res.status(200).json({
                            msg: "Data edited successfully",
                            status: 1,
                            data: newData,
                        });
                    } else {
                        return res
                            .status(200)
                            .json({ msg: "Data not edited", status: 0 });
                    }
                } else {
                    return res
                        .status(200)
                        .json({ msg: "Data not found", status: 0 });
                }
            } else {
                return res
                    .status(200)
                    .json({ msg: "Invalid field", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Invalid id", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something Wrong", status: 0 });
    }
};

module.exports.deleteManager = async (req, res) => {
    try {
        let mData = await Manager.findById(req.query.id);
        if (mData) {
            let deleteData = await Manager.findByIdAndDelete(req.query.id);
            if (deleteData) {
                return res.status(200).json({
                    msg: "Manager deleted successfully",
                    status: 1,
                    deleteData: deleteData,
                });
            } else {
                return res
                    .status(200)
                    .json({ msg: "Manager not deleted", status: 0 });
            }
        } else {
            return res
                .status(200)
                .json({ msg: "Manager not found", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.viewAllUser = async (req, res) => {
    try {
        let userData = await User.find({});
        if (userData) {
            return res.status(200).json({
                msg: "Here is all user data",
                status: 1,
                userData: userData,
            });
        } else {
            return res
                .status(200)
                .json({ msg: "User data not found", status: 1 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};
