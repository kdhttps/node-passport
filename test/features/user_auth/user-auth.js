const assert = require('assert');
const { After, When, Then, BeforeAll, AfterAll } = require('cucumber');
const { Builder, By, until, Capabilities, Capability } = require('selenium-webdriver');
const { expect } = require('chai');
var server = require('../../../index');

BeforeAll(async () => {
    await new Promise((resolve, _) => {
        setTimeout(() => {
            server = require('../../../index');
            resolve();
        }, 100);
    })
});

When('user request for profile', async () => {
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:4200');

    await this.driver.findElement(By.linkText('Profile')).click();
});

Then('user should get login button', async () => {
    const loginButton = await this.driver.findElement(By.linkText('Gluu Login'));
    assert(loginButton);
});

When('user click on login button', async () => {
    const capabilities = Capabilities.chrome();
    capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true);

    this.driver = new Builder()
        .withCapabilities(capabilities)
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:4200');

    await this.driver.findElement(By.linkText('Profile')).click();
    await this.driver.findElement(By.linkText('Gluu Login')).click();
});

Then('user should get redirected to OP Server', async () => {
    const loginButton = await this.driver.wait(until.elementLocated(By.id('loginForm:loginButton')), 20000);
    assert(loginButton);
});

When('user click on login button, redirect to op and enter credentials {string} and {string}', async (name, password) => {
    const capabilities = Capabilities.chrome();
    capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true);

    this.driver = new Builder()
        .withCapabilities(capabilities)
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:4200');

    await this.driver.findElement(By.linkText('Profile')).click();
    await this.driver.findElement(By.linkText('Gluu Login')).click();

    // Now we are at OP side
    await this.driver.findElement(By.id('loginForm:username')).sendKeys(name);
    await this.driver.findElement(By.id('loginForm:password')).sendKeys(password);
    await this.driver.findElement(By.id('loginForm:loginButton')).click();

    // user allow for details
    try {
        const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'));
        if(scopeAllowButton) {
            await scopeAllowButton.click();
        }
    } catch(_) {

    }
});

Then('user should get redirected back to website and see profile details with name {string}', async (name) => {
    const userName = await this.driver.findElement(By.id('username'));
    expect(await userName.getText()).to.match(/ross/);
});

After(async () => {
    await this.driver.close();
});

AfterAll(async () => {
    server.close();
})