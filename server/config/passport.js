'use strict';

var passport = require('passport');
var BufferAppStrategy = require('passport-bufferapp').Strategy;
var request = require('request');
var mongoose = require ('mongoose');

// Create mongoose models for auth flow
var BufferUser = new mongoose.Schema({
    name: String,
    bufferID: String,
    accessToken: String,
    accountIDS: Array
});
var User = mongoose.model('user', BufferUser);

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findOne({
          _id: id
      }, '-salt -hashed_password', function(err, user) {
          done(err, user);
      });
  });


  passport.use(new BufferAppStrategy({
      clientID: process.env.BUFFER_CLIENT_ID,
      clientSecret: process.env.BUFFER_CLIENT_SECRET,
      callbackURL: process.env.BUFFER_REDIRECT_URI
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('Buffer function hit:' + accessToken);
      console.log('buffer ID: ' + profile.id);
      console.log(profile._json.name);
      // return done();

      User.findOne({ 'bufferID': profile.id }, function(err, user) {
        console.log('User: ' + user);
        if (err) {
          return done(err);
        } else if (!user) {
          user = new User({
              name: profile._json.name,
              bufferID: profile.id,
              accessToken: accessToken
          });

          request.get('https://api.bufferapp.com/1/profiles.json?access_token='+accessToken, function (e, r, body) {

            if (user.accountIDS === []) {
              var accs = JSON.parse(body);
              for(let i = 0; i < accs.length; i++) {
                console.log(accs[i].id);
                user.accountIDS.push(accs[i].id);
              }
            }

            user.save(function(err) {
                if (err) {console.log(err);}
                return done(err, user);
            });
          });
        } else {
          request.get('https://api.bufferapp.com/1/profiles.json?access_token='+accessToken, function (e, r, body) {
            console.log('BUFFER IDS: ' + body);

            var accs = JSON.parse(body);
            for(let i = 0; i < accs.length; i++) {
              console.log(accs[i].id);
              user.accountIDS.push(accs[i].id);
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
