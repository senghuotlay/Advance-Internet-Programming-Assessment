const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Config = require('../config/database');


module.exports = function(passport) {
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = Config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserByID(jwt_payload._id, (err, user) => {
            if(err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            }

            else {
                return done(null,false);
            }
        })
    }));
}