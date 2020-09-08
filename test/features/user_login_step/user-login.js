const assert = require('assert');
const { Before, After, Given, When, Then } = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');
var server = require('../../../index');

When('user request for profile', async function () {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:4200');

    await this.driver.findElement(By.linkText('Profile')).click();

    await new Promise((resolve, reject) => {
        setTimeout(() => {
            server = require('../../../index');
            resolve();
        }, 100);
    })
});

Then('user should get login button', async function () {
    const loginButton = await this.driver.findElement(By.linkText('Gluu Login'));
    assert(loginButton);
});

After(async function () {
    await this.driver.close();
    server.close();
});