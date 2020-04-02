const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Admin = mongoose.model('Admin');

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    Admin.findOne({ username })
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'Username or Password': 'is invalid' } });
            }
            return done(null, user);
        }).catch(done);
}));