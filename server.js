var express = require('express');
var path    = require('path');
require('dotenv').config();
var passport = require('passport');
var BufferAppStrategy = require('passport-bufferapp').Strategy;
var request = require('request');
var mongoose = require ('mongoose');
var cookieParser = require('cookie-parser');

var BufferUser = new mongoose.Schema({
    name: String,
    bufferID: String,
    accessToken: String,
    accountIDS: Array
});

var User = mongoose.model('user', BufferUser);

var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.get('/manifest.json', function(req, res){
  res.sendFile(path.join(__dirname + '/public/manifest.json'));
});

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

app.get('/user/auth', passport.authenticate('bufferapp'), function() {
  console.log('auth hit');
});

app.get('/user/auth/buffer/callback', passport.authenticate('bufferapp', { failWithError: true }),
  function(req, res){
    console.log('AUTH SUCCESS');
    res.cookie('user_auth', 'true');
    // res.sendFile(path.join(__dirname + '/public/index.html'));
    res.writeHead(302, {'Location': '/'});
    res.end();
  },
  function(err, req, res, next) {
    console.log('Auth failure: ' + err);
    res.send(err);
  }
);

// connect to the DB
mongoose.connect(process.env.MONGODB_URI, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to DB: ' + err);
  } else {
    console.log ('Succeeded connected to DB');
  }
});





// Campaigns API Routes

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error': message});
}

app.get('/users', function(req, res) {
  console.log('[ROUTE] Users:GET hit');

  // db.collection('users').find({}).toArray(function(err, docs) {
  //   if (err) {
  //     handleError(res, err.message, 'Failed to get contacts.');
  //   } else {
  //     console.log(docs);
  //     res.status(200).json(docs);
  //     return docs;
  //   }
  // });
});



// GET: finds all campaigns
app.get('/campaigns', function(req, res) {
  console.log('[ROUTE] Campaign:GET hit');
  res.send(JSON.stringify({ a: 'Response from Campaigns GET' }));
});

// POST: creates a new campaign
app.post('campaigns', function(req, res) {
  console.log('[ROUTE] Campaign:POST hit');
  res.send(JSON.stringify({ a: 'Response from Campaigns POST' }));
});

// GET: find campaign by id
 app.get('/campaigns/:id', function(req, res) {
   console.log('[ROUTE] Campaign:GET:id hit');
   res.send(JSON.stringify({ a: 'Response from Campaigns GET:id' }));
 });

// PUT: update campaign by id
 app.put('/campaigns/:id', function(req, res) {
   console.log('[ROUTE] Campaign:PUT hit');
   res.send(JSON.stringify({ a: 'Response from Campaigns PUT' }));
 });

// DELETE: deletes campaign by id
 app.delete('campaigns/:id', function(req, res) {
   console.log('[ROUTE] Campaign:DELETE hit');
   res.send(JSON.stringify({ a: 'Response from Campaigns DELETE' }));
 });








// Catch all Route to the main dash
app.get('/', function(req, res){
  console.log('[SERVER.GET] Catch all hit');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
