const admin = require("../../model/Admin/admin");
const bcrypt = require("bcrypt");
const jwtdata = require("jsonwebtoken")

//To register Admin
module.exports.registration = async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.password == req.body.cpass) {
            let checkmail = await admin.findOne({ email: req.body.email })
            if (checkmail) {
                return res.status(200).json({ msg: 'Email Already registered..', status: 0 });
            }
            else {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let data = await admin.create(req.body);
                if (data) {
                    return res.status(200).json({ msg: 'Admin registered Successfully..', status: 1, rec: data });
                }
                else {
                    return res.status(400).json({ msg: 'Admin not Registered,Try Again!!', status: 0 });
                }
            }
        }
        else {
            console.log('password Does not Match');
            return res.status(200).json({ msg: 'Confirm Passowrd Does not match with New Password..', status: 0 });
        }

    } catch (error) {
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
};

//To get All Admin Records
module.exports.getalladmin = async (req, res) => {
    try {
        let alladminData = await admin.find({});
        if (alladminData) {
            return res.status(200).json({ msg: 'All Admin Data are..', status: 1, rec: alladminData });
        }
        else {
            return res.status(200).json({ msg: 'No Record Found', status: 0 });

        }

    } catch (error) {
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
};


//To Get Admin data
module.exports.getadmin = async (req, res) => {
    try {
        let admindata = await admin.findOne({ email: req.body.email });
        if (admindata) {
            return res.status(200).json({ mdg: 'Admin record is..', status: 1, rec: admindata });
        }
        else {
            return res.status(200).json({ mdg: 'No Record Found', status: 0 });

        }

    } catch (error) {
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
};

//To Update Admin Dta
module.exports.updateadmin = async (req, res) => {
    try {
        let updates = await admin.findByIdAndUpdate(req.params.id, req.body);
        if (updates) {
            let newRec = await admin.findById(req.params.id);
            return res.status(200).json({ msg: 'Admin Data Updated Successfully..', status: 1, rec: updates });
        }
        else {
            return res.status(200).json({ msg: 'Admin Data Not Found..', status: 0 });
        }

    } catch (error) {
        console.log('Something Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
};

//To Login 
module.exports.login = async (req, res) => {
    try {
        console.log(req.body);
        let check = await admin.findOne({ email: req.body.email })
        if (check) {
            if (await bcrypt.compare(req.body.password, check.password)) {
                console.log(check);
                let token = await jwtdata.sign({ data: check }, 'AMU', { expiresIn: '1h' })
                console.log(token);
                return res.status(200).json({ msg: 'Login Succ.. & token granted Succ....', status: 1, rec: token });
            }
            else {
                return res.status(200).json({ msg: 'Password not match', status: 0 });
            }
        }
        else {
            console.log(' invalid email ');
            return res.status(200).json({ msg: 'invalid email', status: 0 });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
};
