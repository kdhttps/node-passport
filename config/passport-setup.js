const passport = require('passport')
const PassportOIDCStrategy = require('passport-openidconnect')
const PassportSAMLStrategy = require('passport-saml').Strategy
const { Strategy, Issuer } = require('openid-client')

const strategyConfig = require('./client-creds')

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => done(null, user))

passport.use('oidc-acr-passport-social',
  new PassportOIDCStrategy({ ...strategyConfig.oidcClientConfig, acr_values: 'passport_social' },
    // verify
    oidcVerify
  )
)

passport.use('oidc-acr-passport-saml',
  new PassportOIDCStrategy({ ...strategyConfig.oidcClientConfig, acr_values: 'passport_saml' },
    // verify
    oidcVerify
  )
)

function oidcVerify (issuer, sub, profile, accessToken, refreshToken, done) {
  if (accessToken) {
    return done(null, { id: sub, name: profile.displayName })
  }

  return done({ message: 'Failed to get access_token' }, null)
}

const oPassportSAMLStrategy = new PassportSAMLStrategy(strategyConfig.samlConfig,
  // verfiy
  (profile, done) => {
    console.log('--- SAML Response ---', profile)
    return done(null, { id: profile['urn:oid:0.9.2342.19200300.100.1.3'], name: profile['urn:oid:2.16.840.1.113730.3.1.241'] })
  }
)

passport.use(
  oPassportSAMLStrategy
)

async function initOpenIdClientStrategy () {
  const issuer = await Issuer.discover('https://gluu.mali.org')
  const jwksKeys = await issuer.keystore(true)
  // const jwksRS256 = jwksKeys._keys.entries().next().value[0]
  // const jwksFinal = {
  //   kty: jwksRS256.kty,
  //   e: jwksRS256.e,
  //   use: jwksRS256.use,
  //   crv: jwksRS256.crv,
  //   kid: jwksRS256.kid,
  //   x5c: jwksRS256.x5c,
  //   exp: jwksRS256.exp,
  //   alg: jwksRS256.alg,
  //   n: jwksRS256.n
  // }

  const Client = new issuer.Client({
    client_id: '2b4eedc3-b31a-45dd-b268-6c97ope0ff16e67',
    client_secret: 'nmGIw7bAIKjrACXODzjPJyfYDaECAWSYzE1Temqz',
    redirect_uris: ['http://localhost:4200/auth/openidclient/redirect'],
    token_endpoint_auth_method: 'private_key_jwt'
  }, jwksKeys.toJWKS())
  console.log('----', Client)
  // openid-client
  passport.use('openid-client',
    new Strategy({
      client: Client
    },
    (token, userinfo, done) => {
      console.log(token, userinfo)
      done(null, { id: userinfo.sub })
    })
  )
}

initOpenIdClientStrategy()

module.exports = {
  oPassportSAMLStrategy
}
