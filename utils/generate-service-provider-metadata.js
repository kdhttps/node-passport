const fs = require('fs')
const SAMLStrategy = require('../config/passport-setup').oPassportSAMLStrategy

// decryptionCert from your idp - /etc/certs/passport-sp.crt in Gluu CE Case
const decryptionCertContent = `-----BEGIN CERTIFICATE-----
MIIDWTCCAkECFEn2BnVdFe6iwZU8UwbUd+/JfReFMA0GCSqGSIb3DQEBCwUAMGkx
CzAJBgNVBAYTAklOMQswCQYDVQQIDAJHSjELMAkGA1UEBwwCU1UxDTALBgNVBAoM
BGdsdXUxEjAQBgNVBAMMCWxvY2FsaG9zdDEdMBsGCSqGSIb3DQEJARYOa2lyYW5A
Z2x1dS5vcmcwHhcNMjEwMzA0MTgyMjIwWhcNMjIwMzA0MTgyMjIwWjBpMQswCQYD
VQQGEwJJTjELMAkGA1UECAwCR0oxCzAJBgNVBAcMAlNVMQ0wCwYDVQQKDARnbHV1
MRIwEAYDVQQDDAlsb2NhbGhvc3QxHTAbBgkqhkiG9w0BCQEWDmtpcmFuQGdsdXUu
b3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx2d+z6yp4gsQBRBh
4Ux/7HzV6DjFMfwCQbxw5VUyYJWyJ3sFJ61jKBYKZA//h2mVsHmP2Q1SF6Ww0Sfa
7uuEzudyCaL405oUJyusbCSuGRNPMCWX8sU0Xhm0XkXtkGCKbnRBbexUl8ieEW+t
GvBytXk502kW+qq5tRa2y/q6+owzAqZ/IHoNUJSDtyqKS+6zOyr5Hndv389Aqprj
oLcmPFMFyU9IBZ9clongyHb3gwQM1W8DewlEKJL7TI7LDHIhAHZJEUIcpuGFtAsW
zUoqfbaFWcZ+xqRBSXp37CDfAffQjpnKPdLm9RmcX4nOPWqTUhlJdL3lRwAhL87W
tJ/gRwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCDU0M3jV/fR00/PgxH/kMwOrC5
MopRLAbX4CmFWLRZj/hTqk3oIEz0MwvyE4Z4+GdMhTy9hajnu1hh8bXRkjjq5BYN
PH4Yg8pJrYUFibbA9V21nekjILR8QDiNBboNPlfAdbRclm5KQy/DpDxNDRVPbY49
eqwA9ILfrqy1Qp3LR146oNVcaJ2SSSM+kyT77KRiU8vXgGmYsfYtf9lAFawc7eVZ
w7VVxQ/khMbgrhSFCaB35kUGcgkjvjQsANIHV8TQPrgWKhnwZ9oy4yj6qt/LjMS8
crz/sh77342B2USUYB5Ujz3sJh0i2Wk5z/rqlp/rq8y0txXEt6QrRG/LXCAg
-----END CERTIFICATE-----`

// metafile name
const metaFile = `${__dirname}/local.xml`

async function generateMetadata () {
  try {
    SAMLStrategy.generateServiceProviderMetadata({ originalUrl: '/auth/saml1/redirect' }, decryptionCertContent, null, async function (err, metaContent) {
      if (err) {
        console.log(err)
      }
      console.log(metaContent)
      console.log(metaFile)
      await fs.openSync(metaFile, 'w')
      await fs.writeFileSync(metaFile, metaContent)
    })
  } catch (e) {
    console.log(e)
  }
}

generateMetadata()
