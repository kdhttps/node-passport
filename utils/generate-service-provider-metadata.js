const fs = require('fs')
const SAMLStrategy = require('../config/passport-setup').oPassportOIDCStrategy

// decryptionCert from your idp - /etc/certs/passport-sp.crt in Gluu CE Case
const decryptionCertContent = `-----BEGIN CERTIFICATE-----
MIIDXzCCAkcCFHizgWdN08Xx252haFX+HOxIO9IuMA0GCSqGSIb3DQEBCwUAMGwx
CzAJBgNVBAYTAklOMQswCQYDVQQIDAJHSjEOMAwGA1UEBwwFU3VyYXQxDTALBgNV
BAoMBEdsdXUxEjAQBgNVBAMMCWxvY2FsaG9zdDEdMBsGCSqGSIb3DQEJARYOa2ly
YW5AZ2x1dS5vcmcwHhcNMjAwOTE1MTMyODI4WhcNMjEwOTE1MTMyODI4WjBsMQsw
CQYDVQQGEwJJTjELMAkGA1UECAwCR0oxDjAMBgNVBAcMBVN1cmF0MQ0wCwYDVQQK
DARHbHV1MRIwEAYDVQQDDAlsb2NhbGhvc3QxHTAbBgkqhkiG9w0BCQEWDmtpcmFu
QGdsdXUub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs232wBVX
dLiUAq+7Cj56Hof3N/jzC6pu/SCmu6eeOQ7p4mYIlK159SpcT26+enS3psnS5ygw
QOyuY524JO7sTaFDjmfCyr56e/xWoYIw3QKQUhknS5ydQcyWwGaDd2Olq284mC+/
iGM3xSV4RZ+ObkXFWNybmlPTudy64yLxaYD7LoqovSQ64xwUtjQlPgAPgSKHlw93
Vv9u/cNRSkMnuLVRH1svsHNUasFUqvJr3KGljzfqXPc/kUYQ4oRFQFbkp9ZbYsG9
vVypz7Vpact6bexyaZbD1tnp09P3q1TCFr0HDH19vG0/5PpvsVmht+dkMFw6l013
YaM59rNZeEwvRQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAjt79vS882zHw+gOEA
bfTjavBDv9DQX+JIL/+Z4Jyhs6wprH4LpZhrkNqPmR1V+3tFsGzdAzSjXeAVWygG
feLUhv1slU2tDZeB466eFdicKPa8f58L1s+3QXtonZkJo09BvjuSq2vG8mkSDzI9
TtInea7dkYpYnIy34mUvJlAoIucUIMFneglXsmyI2adnC9hj51+CzATOe3NUI9qM
QK6grL9Ih0SMgBYBLkxdoX6ht/xW86tKvBF23EaVFWLa28psKXtk0xvP4opmh/Pk
gBZ7h20BtJgTFSRP1T6kjXqqojVXcctrl2SpLWKEAd1SbRd8iXVNRTdmYHTgKuCn
3NM6
-----END CERTIFICATE-----`

// signingCert - the cert from url https://<your.idp.com>/idp/shibboleth endpoint in side `signing` > `ds:X509Certificate`
const signingCertContent = 'MIIDZzCCAk8CFBEpsZWJPn11KnqUTQCbTVRo/e24MA0GCSqGSIb3DQEBCwUAMHAx CzAJBgNVBAYTAklOMQswCQYDVQQIDAJHSjEOMAwGA1UEBwwFU3VyYXQxDTALBgNV BAoMBEdsdXUxFjAUBgNVBAMMDWdsdXUubWFsaS5vcmcxHTAbBgkqhkiG9w0BCQEW DmtpcmFuQGdsdXUub3JnMB4XDTIwMDkxNTEzMjgyN1oXDTIxMDkxNTEzMjgyN1ow cDELMAkGA1UEBhMCSU4xCzAJBgNVBAgMAkdKMQ4wDAYDVQQHDAVTdXJhdDENMAsG A1UECgwER2x1dTEWMBQGA1UEAwwNZ2x1dS5tYWxpLm9yZzEdMBsGCSqGSIb3DQEJ ARYOa2lyYW5AZ2x1dS5vcmcwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB AQDGTkW9GGgd0U+2UEtzREb7oLj/O3XwavQClNTzY9VOyN0E8wmHl9BVfRWG0NoH zyoRDg7qikg8Z8OjIkuO70lmnW6A5C5441nw6FtBs7aRYProjMHEo7Tqihq+FtPW Pk2zEaRhuYsWqS27zuqz/rkoASkFDlvi4zr+T9MDf3i8Fo1l6+ZJqDzOBt4y98vG X6PjDRnpNMmcGBW72Jccl2QNeKH4XYVjVMQ/d/vXZL4aLmdNX81qkZUXyi881hwg XOJ9dSTCIPUqUUSqmlKWyltsqa35NbtqJwD10nRsxYCO09BleK2A3MBl9IzFwDY/ vw0Rb3ziGnMQ55OpQsPsXKTdAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAL/PtrPT Dlvs0zOUW7jmyO0snHmVXJYsmEd7HkWf40t9YEtVm8KmdzkoBwzj3pTjDmSS3i56 QDxWRBFytDclLaugWSC15CTSCiywuuToIQSyzQwU7RxFDBKZSeP7KqaOsdgN0WL9 NXi1DZQ93VKwfPq7uW5evRqQvMQz/38B/PUvai0gBbGF3B3N8REaWpbu+vNFsICO 0WX5kp1Cwp7YoWU1K/+03XKoFWzfzwWebgNlbhmHTWfJ1yXAxPkp3aEURxZOB90g cJi5f1HAzbAyaz6QJp5ta4iYZRnGITW82xtf0qC1oxH8e6sfrwLyIfPHxlCAaq6k pt5YQWUfMZKxlW0='

// metafile name
const metaFile = `${__dirname}/local.xml`

async function generateMetadata () {
  try {
    const metaContent = await SAMLStrategy.generateServiceProviderMetadata(decryptionCertContent, signingCertContent)
    console.log(metaContent)
    console.log(metaFile)
    await fs.openSync(metaFile, 'w')
    await fs.writeFileSync(metaFile, metaContent)
  } catch (e) {
    console.log(e)
  }
}

generateMetadata()
