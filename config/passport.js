var GoogleStrategy = require("passport-google-oauth20").Strategy;
var mongoose = require("mongoose");
var keys = require("./keys");
var User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf("?")
        );
        var newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: image
        };
        // check for existing user
        User.findOne({
          googleID: profile.id
        })
          .then(user => {
            if (user) {
              done(null, user);
            } else {
              User.create(newUser, (err, result) => {
                if (err) {
                  res.json({
                    confirmation: "FAIL",
                    message: err
                  });
                  return;
                } else {
                  done(null, result);
                  return;
                }
              });
            }
          })
          .catch(err => console.log(err));
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, result) => {
      if(err) {
        res.json({
          confirmation: "FAIL",
          message: err
        });
        return;
      } else {
        done(null, result);
        return;
      }
    });
  });
};
