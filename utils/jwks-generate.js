const { JWK: { asKey, generateSync }, JWKS: { KeyStore, asKeyStore } } = require('jose')

// const k = generateSync('RSA')
// const ks = new KeyStore(k)
// console.log(ks.toJWKS(true), '---------------')
// console.log(ks.get({ alg: 'RS256' }))

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

console.log(ks.toJWKS(), '---------', ks.get({ alg: 'RS256' }))
