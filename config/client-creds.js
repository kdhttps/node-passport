module.exports = {
  oidcClientConfig: {
    issuer: 'https://gluu.mali.org',
    authorizationURL: 'https://gluu.mali.org/oxauth/restv1/authorize',
    tokenURL: 'https://gluu.mali.org/oxauth/restv1/token',
    userInfoURL: 'https://gluu.mali.org/oxauth/restv1/userinfo',
    clientID: '0afc1879-4aeb-4da9-bd02-223376b9dffc',
    clientSecret: '2ydTfprKTkFTv45YEOSKsgtcwnes2prhujMUkp9q',
    callbackURL: 'http://localhost:4200/auth/oidc/redirect',
    scope: 'openid email profile'
  },
  googleClient: {
    clientID: '-----',
    clientSecret: '----',
    callbackURL: 'http://localhost:4200/auth/google/redirect'
  },
  // oidcClientConfig: {
  //   issuer: 'https://p2.gluu.org',
  //   authorizationURL: 'https://p2.gluu.org/oxauth/restv1/authorize',
  //   tokenURL: 'https://p2.gluu.org/oxauth/restv1/token',
  //   userInfoURL: 'https://p2.gluu.org/oxauth/restv1/userinfo',
  //   clientID: 'b2710eca-fe6e-4962-87ea-9de771eec34c',
  //   clientSecret: 'icN4Em686icxPopg6jf0Zm3fPp8pFs6WSvzQVM7y',
  //   callbackURL: 'http://localhost:4200/auth/oidc/redirect',
  //   scope: 'openid email profile'
  // },
  samlConfig: {
    entryPoint: 'https://p2.gluu.org/idp/profile/SAML2/POST/SSO',
    identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
    authnRequestBinding: 'HTTP-POST',
    issuer: 'passport_saml_rp_custom',
    skipRequestCompression: true,
    callbackUrl: 'http://localhost:4200/auth/saml/redirect',
    cert: 'MIIDYzCCAksCFEkI/c3+1hq60vvZxZuyWe2xmgXLMA0GCSqGSIb3DQEBCwUAMG4x CzAJBgNVBAYTAklOMQswCQYDVQQIDAJHSjEOMAwGA1UEBwwFU3VyYXQxDTALBgNV BAoMBEdsdXUxFDASBgNVBAMMC3AyLmdsdXUub3JnMR0wGwYJKoZIhvcNAQkBFg5r aXJhbkBnbHV1Lm9yZzAeFw0yMDA5MjgxMzI3NTRaFw0yMTA5MjgxMzI3NTRaMG4x CzAJBgNVBAYTAklOMQswCQYDVQQIDAJHSjEOMAwGA1UEBwwFU3VyYXQxDTALBgNV BAoMBEdsdXUxFDASBgNVBAMMC3AyLmdsdXUub3JnMR0wGwYJKoZIhvcNAQkBFg5r aXJhbkBnbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALWu N7W7i/kdLRkdVyPpvsTkUg0Wt/UqdmQwO2agqmQ3omQZskeNuQM+1x4J6UL/vZp6 Ikt/BiYjuT2k8gAPw0j1bv3WDgfC2+m6JMJC4Bm97Xe+N9T126Ek1KnSjubQe/Zg 9lui8FRZrYTC9P7JMQQWGulQ1vfUYdp6V/huaP6qnP82xYGbCaFqrDgb9kQaf6Im 9zIwEby4//2vTlq7ObxNlk3Ed95n215WfOtXQNd2RG5A4mieGQXp27vLKCqW8nsk poczOMQM9ypjuB3lrLs0hsTizl7jlBXVrD2PNOsSgTLdUbI+lSSTz6/aM+Zlpb6M g5skIorUNVpz9pWWGiUCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAtUouwP1otY7b d/GrA3iT03lbepvtm7q11DNioa02ULUbwia2/Tlc4AHCv+tD83FfjNliQGrKvIhH mx25NMV4M0q6ZZIs43qG1CacqIxSH3ST+TUZeYY99eVisAqxs1ZeeOy9+QZqMywS OSfWfD0VBbSZowQZki7DUqfekhOftRv01IzvPjJtVYv06GKt9+HbS3Drxa+/D9Gu wEPIFbnGG9J8GojClSq4SXimAsjnl8aZSb2nMan7ocFMtG38Tm4gvhZvdnW7k22G k6v7YeFtKIuBnuu31fUFScWVbAi2+Mkd2Na+/CU+RHcZ6EUbr6WIelf5HnQabc8l 8sp9SFqtUw==',
    // validateInResponseTo: true,
    requestIdExpirationPeriodMs: 3600000,
    // /etc/certs/passport-sp.key
    decryptionPvk: `-----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAtQbaFTm+yrkInyHD1RW2mxDwJ36iBtZXD8pT72o9ioIKaP7o
    NyEUGPJKdvIAg1olSuO0gh+Z6AAlYX3iBqx8FlXBdQFua2cqgoQeN88Pv8vX0VyH
    lUyyMV40/UWSS/TG1K8Zz8hS9iJu5PiY5/9aAMGDxZlx7Zaoyhtr6wwpdsCe2fbj
    lAVV7tD/RZzAxhpxKp2nEeoeO8HLBWrelENEzM+F1POImHCydywqYt5tsnCldSgD
    rD4kYmdWh9AJGqIk0soxha4USa3+DB5HhpCNpmNjWX9BVoE21/rANiMuvqsSux2+
    FdttMeJJORWyPQeiEJSF6saipIBQCFlupd1kpQIDAQABAoIBAF0emTAx9CLz66tw
    AvypnrVFkUO/sDk0KLTGr0aIr/9/xTsdZPZ23Y+3kvZ8pibrSCOt3jzRZKoi6Ret
    WYd1Up9qnYlCozo8Z3Gb5K9wo/lVMj9QCa6TNVaPz1I5Z3gLAfyF1hE8SvCx5bmC
    56Tvhay93rrWo/RDe6/7SxgtuWaL8LyWXHl/rPrLAI5CeTQmw2XXriJNEk/FYBz2
    S0udcxdowPnhHWWzOQS1HbgWSn3WqyBdN9Of2vz12D6a3mVbdRUwnxKCa31E5vPs
    RALgUry5pHht/beMgODWloRnaPYrVH8vV8pou0HCNZRQDsrLXBxkOkwcqXRJZGfh
    OG1lQAECgYEA7DbPFzDD8qvPwt0Z/fisSynlri6cknzTKBQOSSL7zLn41CmJZjw6
    G7AS3XaMvQ8FzCmt7KsqJD2pjvL5TZruT7NRj6CPiuh/eRGL4+xjDmhBMzvjc+Ng
    NMBMfbJSZV0zhmTEMq8/cpABzo3aKna2ly791GQJ8mXwQMYT3aJYAwECgYEAxDCm
    Ft4+DtyFGTl3pdXQYmn5jUjpwnHXy6CjHMdbKW0k/2jRHFrfPYlkIDuBqa53DV1l
    QE7HlnaBHJjyNtHC8NHpOvX/FVmGNdDAYJI/UJv1d4qyWtVYOgCpGdm7TRrX0Qa8
    //du3A5lOQJtMz/7dEi9R5NxEsYDaxpgiX3EdaUCgYEAt7T0oEuLyTp4DUvZgByb
    GqXN/AZCPOcZba0TYyvy+siTzaU0N6+VXZ01PsmJMSvyzVKI8mw4DRFrwkITQ5i/
    yHpkbzhnCphBM05DJpLcgwLv2kG0ZpeqZbw8gPFjhXPTs6zArc5/oMCAtzy5NJc4
    8CFaxYi796nyDN4/6vnsSwECgYBLh+s5nKBJum5nkq9UoieS6/fOhAay/H82/wYt
    GzcmkMWQqzrubrHJkC6DFkXKHMfq1k0X3/yJGeCFMQD3R/SEIFxpfbGR96Bq8Y5O
    358Omqx7NGOMAtzvn7d6o0+v1KjH6Y80AH+mqsgflaaS94wIbcSpXMNIlgFU55fI
    9yl+nQKBgQCR/JDHZaSQnV2q6K+2QjrwhaODHxTdPG8Q3uN3sYnJjlS1TEG/qUMp
    ElmWDMABIH0I6kFJ3jOj+Is/z9fNae/91CNW0GomCQrH2yWvNBKXzBRArVRBX4Jk
    Dpw74DM0BNd4XwG4cMDN7r94UkMZOp6Wpj3c/NBMVtEZUyb36KhgdA==
    -----END RSA PRIVATE KEY-----`
  }
}
