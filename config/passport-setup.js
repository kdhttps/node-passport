const passport = require('passport');
const passportOXDStrategy = require('passport-oxd');
const oxdClientConfig = require('./client-creds');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new passportOXDStrategy(oxdClientConfig, 
    // verify
    (req, accessTokenResponse, userInfoResponse, done) => {
    if (accessTokenResponse) {
      return done(null, { id: userInfoResponse.sub, name: userInfoResponse.name });
    }

    return done({ message: 'Failed to get access_token' }, null);
  })
);
