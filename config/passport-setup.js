const passport = require('passport')
const PassportOIDCStrategy = require('passport-openidconnect')
const PassportSAMLStrategy = require('passport-saml').Strategy
const { Strategy, Issuer } = require('openid-client')
const { JWKS: { asKeyStore } } = require('jose')
const keySet = {
  keys: [
    {
      e: 'AQAB',
      n: 'y2oEvxA-LUvZfIn5oT0EMoiojTcL9D2dEDEH9w18Kns7QhWGYlsv6RLFlM5BU6ey8WY5sD81kPkwYsp-hxSswsbvydoWOSbUHcI8BQZCNXXbvE2cLv0WYhHK6l6C71P3RzIG8-hvmmIH5E-N8I5xJLJJK1ioWsjz-YcupjJGbUbwnuHjWnOGyjU80qqYmqGgIoizEhbOnwzmKXUiP17ZeEgHEd-qBDAHPlqmfGE8ECfOyvrFoudaHOqsD5g6VvuJN4Fk8jwxfsXtmuF9Wz6JaJCakTTZJDD8dhEy-WxCXvEXQj0682cmP2o_xotfQKcZNyGZr5j3DBsDzMhDQV6Ntw',
      d: 'ODjrauvQY7CtQjDYoGo--MCw5acrVKya9ti2fOBrS0qYTGGqrRDLIz6fAcwoXjjhyrsYgtBVu-ZEK2oQosFiJsvZhw8SSWWkBz2iXTknn6MdwuQooQwu3ZhRX4oT4pZwqGr5ZPz_q8ogqEgc0Tptp1jnxGVS0xTr6jIlAKawtI8C2KJdQ87fBN4SLm9vzVpN33akHvr8A9c069QmZbDExP-Lcsv-X5pyCs-YmNvPfcLxQ9yzikWomX_-2in_MLWu4_UqQg_hlJe8Nl3jaYtPoPTuABRWMNJka1lHVkH137a-eUNTxlZm-rY7jz-d0mEMn-6Hxu48NkDxTXM08POOwQ',
      p: '5ah8D_pRSKy9IU_9xAXqYKjA_kPGD5P2mVo-JuV_elzGPr1QOsND7lowLJWpRuNlRjhidx9ZRe7WGMANUe6r1sgt4ywPANwNz8Unjdk8YHMIePs1_cMplWXOTtuB72l6Qg3ix72eh-rax9Rb-WpqYewubX87GHZGGxm_2SArNpE',
      q: '4r7sgwrwmMtXuo2I0R8S1sFs-ujXTcziyiboQmmg0EkYO608oOvx3k67UQ0gI575cE89KLzNxtuQrxfnfHrlysbHVerHPdtt6I2XbTZU55PPbmzkkPfRFlAWwlFlh_1I9JQ7g1N89inczIYGZdZAzN-qkBYqGW1PnZB1ATwEc8c',
      dp: 'SnKkzRUrVnDQ2sSwkeQNB4qNDZ_wy8n-bdYIQdmxynvatCnwoSv9kH3iEgHuHxHGGc5bdRxPd1EmTF2ts7q4L-cyoOr-bhvnykuyN9SNMwL3YyikZv_mMg0PpRaZd3_s5w7TTkbU5mCmzZK0whTSKa5DmrFc-eAVd-GQBJXeDFE',
      dq: 'gfYCY32St1DdQJy8zXes-ZA14X4xYXNMjadNOjuGo7sxe4rolCeIIu4naOZIBIKq35dbK41DuHXCcMkXsf5S1S2ntPPzLN4nGcKGB1-7vFu46cbaHskbe1l-IfQ7aH1hImYP0k648fK-ji9HXXk2_PY5sYoyqQ5BMsNIfOOkfaM',
      qi: 's5bke08DBep6l4cpVDb-kKY-Q8tzwhwtosWjJdr8sVUlHt2rJ-l1lKDAPLdt2CnyCAYinP_XTs7RD9c1XiZ_FmOM8i9yV-Ug1XYmBNkYwh_kAWC696-Pc3p6Vxtidr1gKgw4rTFxFuLsKag83m8MfmngWqI3kmio2p5gEZZmt5Y',
      kty: 'RSA',
      kid: 'IYPgCuz8-bUx9sZOFo6FF4iN4Eo_S03OjSp2oyrz5zM'
    }
  ]
}

const jwk = keySet.keys[0]

const ks = asKeyStore({
  keys: [{ ...jwk }]
})

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
    client_id: '2b4eedc3-b31a-45dd-b268-6c970ff16e67',
    client_secret: 'nmGIw7bAIKjrACXODzjPJyfYDaECAWSYzE1Temqz',
    redirect_uris: ['http://localhost:4200/auth/openidclient/redirect'],
    token_endpoint_auth_method: 'private_key_jwt'
  }, ks.toJWKS(true))
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
