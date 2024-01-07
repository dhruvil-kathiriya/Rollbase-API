const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

const jwtManager = require("jsonwebtoken");

const User = require("../../../../model/user/User");

module.exports.insertUserData = async (req, res) => {
    try {
        let checkmail = await User.findOne({ email: req.body.email });
        if (checkmail) {
            return res
                .status(200)
                .json({ msg: "Email already exist", status: 0 });
        } else {
            if (req.body.password == req.body.confirm_pass) {
                let userPass = req.body.password;
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let userData = await User.create(req.body);
                if (userData) {
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: `${process.env.SMTP_USER}`,
                            pass: `${process.env.SMTP_PASS}`,
                        },
                    });
                    const info = await transporter.sendMail({
                        from: `${process.env.SMTP_USER}`,
                        to: req.body.email,
                        subject: "User successfully registered",
                        text: "Here is your email and password to login.",
                        html: `<b>Email = ${req.body.email} </b></br></br><b>Password = ${userPass}</b>`,
                    });
                    return res.status(200).json({
                        msg: "User registered successfully",
                        status: 1,
                        userData: userData,
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
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        let checkmail = await User.findOne({ email: req.body.email });
        if (checkmail) {
            if (await bcrypt.compare(req.body.password, checkmail.password)) {
                let token = jwtManager.sign({ userData: checkmail }, "User", {
                    expiresIn: "1h",
                });
                return res.status(200).json({
                    msg: "Login successfully",
                    status: 1,
                    token: token,
                });
            } else {
                return res
                    .status(200)
                    .json({ msg: "Password not match", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Email not match", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.viewUserProfile = async (req, res) => {
    try {
        let userData = await req.user;
        if (userData) {
            return res.status(200).json({
                msg: "Here is your profile",
                status: 1,
                userData: userData,
            });
        } else {
            return res
                .status(200)
                .json({ msg: "Login to view Profile", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.editUserProfile = async (req, res) => {
    try {
        if (req.query) {
            if (req.body) {
                let userData = await User.findById(req.query.id);
                if (userData) {
                    let oldData = await User.findByIdAndUpdate(
                        req.query.id,
                        req.body
                    );
                    let newData = await User.findById(req.query.id);
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
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        let uData = await User.findById(req.query.id);
        if (uData) {
            let deleteData = await User.findByIdAndDelete(req.query.id);
            if (deleteData) {
                return res.status(200).json({
                    msg: "User deleted successfully",
                    status: 1,
                    deleteData: deleteData,
                });
            } else {
                return res
                    .status(200)
                    .json({ msg: "User not deleted", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "User not found", status: 0 });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};
