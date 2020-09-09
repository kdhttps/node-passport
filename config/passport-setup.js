const passport = require('passport');
const passportOXDStrategy = require('passport-oxd');
const passportOIDCStrategy = require('passport-openidconnect');
const strategyConfig = require('./client-creds');

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new passportOXDStrategy(strategyConfig.oxdClientConfig, 
    // verify
    (req, accessTokenResponse, userInfoResponse, done) => {
    if (accessTokenResponse) {
      return done(null, { id: userInfoResponse.sub, name: userInfoResponse.name });
    }

    return done({ message: 'Failed to get access_token' }, null);
  })
);

passport.use('oidc',
  new passportOIDCStrategy(strategyConfig.oidcClientConfig, 
    // verify
    (issuer, sub, profile, accessToken, refreshToken, done) => {
    if (accessToken) {
      return done(null, { id: sub, name: profile.displayName });
    }

    return done({ message: 'Failed to get access_token' }, null);
  })
);
