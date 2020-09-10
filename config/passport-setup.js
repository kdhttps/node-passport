const passport = require('passport')
const PassportOXDStrategy = require('passport-oxd')
const PassportOIDCStrategy = require('passport-openidconnect')
const strategyConfig = require('./client-creds')

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => done(null, user))

passport.use(
  new PassportOXDStrategy(strategyConfig.oxdClientConfig,
    // verify
    (req, accessTokenResponse, userInfoResponse, done) => {
      if (accessTokenResponse) {
        return done(null, { id: userInfoResponse.sub, name: userInfoResponse.name })
      }

      return done({ message: 'Failed to get access_token' }, null)
    })
)

passport.use('oidc',
  new PassportOIDCStrategy(strategyConfig.oidcClientConfig,
    // verify
    (issuer, sub, profile, accessToken, refreshToken, done) => {
      if (accessToken) {
        return done(null, { id: sub, name: profile.displayName })
      }

      return done({ message: 'Failed to get access_token' }, null)
    })
)
