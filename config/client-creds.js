module.exports = {
    issuer: 'https://gluu.mali.org',
    clientID: '468373c1-384d-43b9-a041-5adbaf566af2',
    clientSecret: '12ad2a28-11ba-4f09-b44d-5d7bb1c52b7e',
    oxdID: '4819b6c5-ddd1-4722-a5eb-713fb60b9d77',
    oxdServer: 'https://192.168.0.104:8443',
    scope: ['openid', 'email', 'profile'],
    redirect_uri: 'http://localhost:4200/auth/gluu/redirect',
    acr_values: ['passport_social']
};