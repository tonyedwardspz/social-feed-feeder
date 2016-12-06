'use strict';

var BufferAppStrategy = require('passport-bufferapp').Strategy;
var request = require('request');
var User = require('../singletons/user-singleton').getInstance().getMongooseModel();

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new BufferAppStrategy({
      clientID: process.env.BUFFER_CLIENT_ID,
      clientSecret: process.env.BUFFER_CLIENT_SECRET,
      callbackURL: process.env.BUFFER_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, done) {

      User.findOne({ 'userID': profile.id }, function(err, user) {
        // console.log('User: ' + user);
        if (err) {
          return done(err);
        } else if (!user) {
          user = new User({
              name: profile._json.name,
              userID: profile.id,
              email: null,
              maxDailyPosts : 1,
              accessToken: accessToken,
              refreshToken: refreshToken
          });

          request.get('https://api.bufferapp.com/1/profiles.json?access_token=' + accessToken, function (e, r, body) {

            let accs = JSON.parse(body);
            for(let i = 0; i < accs.length; i++) {
              console.log(accs[i].id);
              user.accountIDS.push(accs[i].id);
            }

            user.save(function(err) {
                if (err) {console.log(err);}
                return done(err, user);
            });
          });
        } else {
          request.get('https://api.bufferapp.com/1/profiles.json?access_token=' + accessToken, function (e, r, body) {
            // console.log('BUFFER RESPONSE: ' + body);

            if (user.accountIDS.length < 1) {
              let accs = JSON.parse(body);
              for(let i = 0; i < accs.length; i++) {
                user.accountIDS.push(accs[i].id);
              }
            }

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
