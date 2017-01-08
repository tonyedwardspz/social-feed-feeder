'use strict';

let BufferAppStrategy = require('passport-bufferapp').Strategy;
let request = require('request');
let User = require('../singletons/user-singleton').getInstance();
let UserModel = User.getMongooseModel();


/**
* Sets up passport user authenication for buffer
* @param {Passport} passport Pass the passport object into 'class'
*/
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new BufferAppStrategy({
      clientID: process.env.BUFFER_CLIENT_ID,
      clientSecret: process.env.BUFFER_CLIENT_SECRET,
      callbackURL: process.env.BUFFER_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, done) {

      UserModel.findOne({ 'userID': profile.id }, function(err, user) {
        if (err) {
          return done(err);
        } else if (!user) {
          user = new UserModel({
              name: profile._json.name,
              userID: profile.id,
              email: null,
              maxDailyPosts : 1,
              accessToken: accessToken,
              refreshToken: refreshToken
          });

          request.get('https://api.bufferapp.com/1/profiles.json?access_token=' + accessToken, function (e, r, body) {

            user.accountIDS = User.sortBufferAccountIDs(JSON.parse(body));
            user.save(function(err) {
                if (err) {console.log(err);}
                return done(err, user);
            });
          });
        } else {
          request.get('https://api.bufferapp.com/1/profiles.json?access_token=' + accessToken, function (e, r, body) {

            user.accountIDS = User.sortBufferAccountIDs(JSON.parse(body));
            user.save(function(err) {
                if (err) {console.log(err);}
                return done(err, user);
            });
          });
        }
      });
    }
  ));
};
