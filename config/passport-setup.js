const passport = require('passport')
const PassportOXDStrategy = require('passport-oxd')
const PassportOIDCStrategy = require('passport-openidconnect')
const PassportSAMLStrategy = require('passport-saml').Strategy
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

const oPassportOIDCStrategy = new PassportSAMLStrategy(strategyConfig.samlConfig,
  // verfiy
  (profile, done) => {
    console.log('--- SAML Response ---', profile)
    return done(null, { id: profile['urn:oid:0.9.2342.19200300.100.1.3'], name: profile['urn:oid:2.16.840.1.113730.3.1.241'] })
  }
)

passport.use(
  oPassportOIDCStrategy
)

module.exports = {
  oPassportOIDCStrategy
}
