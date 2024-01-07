const Passport = require("passport");

const Admin = require("../model/admin/Admin");

const Manager = require("../model/manager/Manager");

const User = require("../model/user/User");

const jwtStrategy = require("passport-jwt").Strategy;

const jwtExtract = require("passport-jwt").ExtractJwt;

let adminOpts = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: "JWTAPI",
};

let managerOpts = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Manager",
};

let userOpts = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: "User",
};

Passport.use(
    new jwtStrategy(adminOpts, async (record, done) => {
        let data = await Admin.findById(record.adminData._id);
        data ? done(null, data) : done(null, false);
    })
);

Passport.use(
    "managerLogin",
    new jwtStrategy(managerOpts, async (record, done) => {
        let data = await Manager.findById(record.managerData._id);
        data ? done(null, data) : done(null, false);
    })
);

Passport.use(
    "userLogin",
    new jwtStrategy(userOpts, async (record, done) => {
        let data = await User.findById(record.userData._id);
        data ? done(null, data) : done(null, false);
    })
);

Passport.serializeUser((user, done) => {
    return done(null, user.id);
});

Passport.deserializeUser(async (id, done) => {
    let reCheck = await Admin.findById(id);
    reCheck ? done(null, reCheck) : done(null, false);
});
