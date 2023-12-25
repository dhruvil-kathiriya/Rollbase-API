const express = require('express');
const port = 8005;
const passport = require('passport');
const passportjwt = require('./config/passport-jwt-strategy');
const path = require('path');
const session = require('express-session');
const db = require('./config/mongoose');
const admin = require('./model/Admin/admin');
const user = require("./model/User/user");
const app = express();

app.use(express.urlencoded());

app.use(session({
    name: 'JWTSESSION',
    secret: 'AMU',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin", require("./routes/Admin/admin"));
app.use("/manager", require("./routes/Manager/manager"));
// app.use("/user", require("./routes/User/user"));

app.listen(port, (err) => {
    if (err) {
        console.log('something wrong')
    }
    console.log('connected on port', port);
})