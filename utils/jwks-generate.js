const { JWKS: { KeyStore }, JWK: { generateSync } } = require('jose')

const k = generateSync('RSA')
const ks = new KeyStore(k)
console.log('Your JWKS', ks.toJWKS(true))
