var passport = require('passport')
  , EvernoteStrategy = require('passport-evernote').Strategy;

  passport.use(new EvernoteStrategy({
  requestTokenURL: 'https://sandbox.evernote.com/oauth',
  accessTokenURL: 'https://sandbox.evernote.com/oauth',
  userAuthorizationURL: 'https://sandbox.evernote.com/OAuth.action',
  consumerKey: 'jtraces02',
  consumerSecret: '4368467df3a8afc8',
  callbackURL: "http://127.0.0.1:3000/"
},
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ evernoteId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));