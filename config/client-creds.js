module.exports = {
  oxdClientConfig: {
    issuer: 'https://gluu.mali.org',
    clientID: '468373c1-384d-43b9-a041-5adbaf566af2',
    clientSecret: '12ad2a28-11ba-4f09-b44d-5d7bb1c52b7e',
    oxdID: '4819b6c5-ddd1-4722-a5eb-713fb60b9d77',
    oxdServer: 'https://192.168.0.104:8443',
    scope: ['openid', 'email', 'profile'],
    redirect_uri: 'http://localhost:4200/auth/oxd/redirect',
    acr_values: ['passport_social']
  },
  oidcClientConfig: {
    issuer: 'https://gluu.mali.org',
    authorizationURL: 'https://gluu.mali.org/oxauth/restv1/authorize',
    tokenURL: 'https://gluu.mali.org/oxauth/restv1/token',
    userInfoURL: 'https://gluu.mali.org/oxauth/restv1/userinfo',
    clientID: '0bba4de0-d55e-4401-a9ff-deed17143f6d',
    clientSecret: 'GcGYGCWMCQkCfYYUI2yj2p2Bjzsk6kYfQDFcq7aD',
    callbackURL: 'http://localhost:4200/auth/oidc/redirect',
    scope: 'openid profile'
  },
  samlConfig: {
    entryPoint: 'https://gluu.mali.org/idp/profile/SAML2/POST/SSO',
    identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
    authnRequestBinding: 'HTTP-POST',
    issuer: 'passport_saml_rp',
    skipRequestCompression: true,
    callbackUrl: 'http://localhost:4200/auth/saml/redirect',
    cert: 'MIIDbTCCAlUCFEnkd/e2uygGhQXfX7bzdTL8N6XrMA0GCSqGSIb3DQEBCwUAMHMx CzAJBgNVBAYTAklOMQswCQYDVQQIDAJHSjEOMAwGA1UEBwwFU3VyYXQxDTALBgNV BAoMBG1hbGkxFjAUBgNVBAMMDWdsdXUubWFsaS5vcmcxIDAeBgkqhkiG9w0BCQEW EWtkaHR0cHNAZ21haWwuY29tMB4XDTIwMDkwMjEyMDgyMFoXDTIxMDkwMjEyMDgy MFowczELMAkGA1UEBhMCSU4xCzAJBgNVBAgMAkdKMQ4wDAYDVQQHDAVTdXJhdDEN MAsGA1UECgwEbWFsaTEWMBQGA1UEAwwNZ2x1dS5tYWxpLm9yZzEgMB4GCSqGSIb3 DQEJARYRa2RodHRwc0BnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw ggEKAoIBAQDVFzhpcluieFP6VXnp/8T+NmMwl3qrQIXWU1v5lbdK0hedEdmgM2gv IcUZ8gSWvxa6DjbXyOloRza7foTY9NblpSP+/VgyL19l+JAkQZmlmM+aW+6XG+uq Fsfa46PeqdM0T+6Bd00OBsQKiUnmJ21dHRcRtlumHUNwSuUN8j03sKYUS7GqsWxD I1e3smy34yeRSvyrSOftW9rYUYWCsSQm56VBNp/2SDZRevufCUhyuPJqD5v87g8h 5UlDBpCP+IN265ai7OuVHQgyR76oZ7sLEF9/Mo4bQP3IAbYX5ejXibh8HWQ5y9A6 /GtsL7fRvEIG78+fPKw2TKCQdgwQZMybAgMBAAEwDQYJKoZIhvcNAQELBQADggEB AHWaxBW3uFWQ4BERGpPI9sQJFbuHfKOXU1U6LoI4DhuhTourejxoANsVGjdn995c vD4NVB9CYApiG0RdhhBkatniuV71e0IQeT+VWspcTDumDuJVTNQPhkk+oZAcXfZG rwDDN6VAT+JtSfMCveF39yqqeigoftyhyi6tK4xUzful83W71Sv3tvcT1896qUJq UYe48b8qw/l6suSkNM0nhuEcXt2XPF/R5EqMGILZffUN5Pc0NOXaUQS0MW5BrUEY 13uHNivneEOI7YfKqdxSQa180D/b+1ViqejF/WScu2T2/o64vROwXa9OJjrI2I4d hD++HHIfN0Z5X7Ykd/DrrGc=',
    // validateInResponseTo: true,
    requestIdExpirationPeriodMs: 3600000,
    decryptionPvk: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA0MQHOuNNQ6c5a/k6yj4GxkYbsuj2NpwZpb65ItzzQzqr8U6s\ntEW6JiukxtlGD5Vn+2Ydg64YdD8nEsX1NeWzMwGsH8R2ighjvsTTQJhsGdslJTRT\nDO9ViOq8ZS3ZF/VimXXCx5mkzvmSXlE3pGF3R3lzg+SMWF9Uby+JLRw99ElY4PyO\naQA+JXgLc7XnlVLeRFJXbq4cjtSEq2LR84tGaaqThEXBsqMhmfV71SMyA4j2Rd8D\nveaRCEJW6poIPNkmFhZKWjzOFe3QXPyHp6bEeBtSA59ZXeTr0BhiQ3mluKDzgOFq\nPZxX0JsrZmA+ATq/P6EA/Z5UthYZac6CzMJJqQIDAQABAoIBAEyetZyaUgAzfrKv\nLTGO5EOe9YmLUNooHo2jWyV9fFa/UN3mpyIeuTxLJlXI5prPlfNBvjFXEyiPCRMt\nzlpyrHta8MZT/8GXZKxeZr49cudmc9KcyqJjsLvoky57TkMpz39NJijFriQ8msi8\n/DP7haCY5ZmRpyTEECQiiTEiPWbLXqzDCTLGMVNQA0MqrxJSpCR4CmdgA3BOz9n4\n0yDywV2vd/XtlRUvKEwtFloQmWdhVDgNivEvBrJc2rDGr8T9Z2qe30SQctCoiYTq\n+MuO4sIQWIu95bnmLUCQTmp1S/BajLaFmQ6tX+p0nic6sjgOKDWdmZHLy9wyY86T\nHlJGd5ECgYEA9c3sHsy1Xaus8dqWb9cuerjB6Qos5zp/Wj164H7cPNxaTO4RglCy\n9Msk9IO66b9M950RmVuoKQ5MLUvxJ6GrXy3Y6fPOAwW0eKzPkvndspC5VpclNqIJ\n5NlhxrP413oVVPK7nqecdxKmKV0PKPd/6Rg8tx2K4PXz2z8JpapysDUCgYEA2WzP\neHT+Z5iR3ZcPCDv3+wntsthRtbmhsvOTs5QwUQQit1NWhLmqzvPxyGjzV0NSZyOl\n+NhtANGYyh9ifQLJxP28YfMK6eqxRI69fjRD44AMEx1O+7qRm+rkuYYIppd0Axm4\nAT7vEOd1sB4au8FSBRT944QKaLwj0Werg00xyiUCgYEA0cDgbkP3vLBEC7qhR10T\nj6vb5TZGrSbRCDuQgMQgwlqzQBSjolWk8Jntti43MUKKtn41R23cqPRHcxvr9QrT\nx4vDH5lqQk/6+kNVerF4SumPDuI54k4SLVSHSF3Jym6mh2//RNr4/O9QFdoQlr/l\nSg7huM0f9upLJtu7KsCxz8UCgYEAivbHt8aW32GdQRKOUgX6HeIfoWIu/0YQ+k5C\nBdHd+7n38lH6h0QfzrwNubiSZyCpJzCaoOy65n4P+IeMrDe++//sinILdKxC9n2A\n0YvYJCywCvt9gtigvhWocIchOlCsnlqux2UQ6S32g0UKcxxBLuxWxTacbIprHijz\nby1EeF0CgYAQer9/lq3hX39KDgGVuw7X/gymRwc4vHrxO3CmMlECyjaDmab/lSzC\n2Vtk0MvxpS2rpsdpjCfvMlQRHDsGohilXxjig68E2/6K+ZMpgFG7wiQYxYfNymbd\nbqZ5ozzQKRahHKm/9EHCSbabCkVGAZDSBZS1tJAaDbRzNwegLAOWSw==\n-----END RSA PRIVATE KEY-----\n'
  }
}
