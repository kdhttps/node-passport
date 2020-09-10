const assert = require('assert');
const { After, When, Then, BeforeAll, AfterAll, setDefaultTimeout } = require('cucumber');
const { Builder, By, until, Capabilities, Capability } = require('selenium-webdriver');
const { expect } = require('chai');
var server = require('../../../index');
const { resolve } = require('path');

setDefaultTimeout(20000);

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
    const loginButton = await this.driver.wait(until.elementLocated(By.linkText('User login - Passport OXD')), 5000);
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
    await this.driver.wait(until.elementLocated(By.linkText('User login - Passport OXD')), 10000).click();
});

Then('user should get redirected to OP Server', async () => {
    const loginButton = await this.driver.wait(until.elementLocated(By.id('loginForm:loginButton')), 10000);
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
    await this.driver.wait(until.elementLocated(By.linkText('User login - Passport OXD')), 10000).click();

    // Now we are at OP side
    await this.driver.wait(until.elementLocated(By.id('loginForm:username')), 10000).sendKeys(name);
    await this.driver.findElement(By.id('loginForm:password')).sendKeys(password);
    await this.driver.findElement(By.id('loginForm:loginButton')).click();

    // user allow for details, optional process for already auth user
    try {
        const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'));
        if (scopeAllowButton) {
            await scopeAllowButton.click();
        }
    } catch (_) {

    }
});

Then('user should get redirected back to website and see profile details with name {string}', async (name) => {
    const userName = await this.driver.findElement(By.id('username'));
    expect(await userName.getText()).to.match(new RegExp(name));
});

When('user click on login button, redirect to authz server, select external op server provider {string}', async (providerName) => {
    const capabilities = Capabilities.chrome();
    capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true);

    this.driver = new Builder()
        .withCapabilities(capabilities)
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:4200');

    await this.driver.findElement(By.linkText('Profile')).click();
    await this.driver.wait(until.elementLocated(By.linkText('User login - Passport OXD')), 10000).click();

    // Now we are at authz(OP) server
    await this.driver.wait(until.elementLocated(By.xpath(`//img[@alt="${providerName}"]`)), 10000).click();
});

When('redirect to external OP, enter credentials {string} and {string}, and user authentication', async (username, password) => {
    // Now we are at external OP side
    await this.driver.wait(until.elementLocated(By.id('loginForm:username')), 10000).sendKeys(username);
    await this.driver.findElement(By.id('loginForm:password')).sendKeys(password);
    await this.driver.findElement(By.id('loginForm:loginButton')).click();

    // user allow for details, optional process for already auth user
    try {
        const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'));
        if (scopeAllowButton) {
            await scopeAllowButton.click();
        }
    } catch (_) {

    }
});

When('back to authz server, add and authenticate user', async () => {
    // Now we are at authz server, which get code from url(sent by external op), get token and get userinfo from external op
    // user allow for details, optional process for already auth user

    try {
        const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'));
        await scopeAllowButton.click();
    } catch (_) {
        await new Promise((resolve, _) => resolve());
    }
})

When('user click on oidc login button, redirect to op and enter credentials {string} and {string}', async (name, password) => {
    const capabilities = Capabilities.chrome();
    capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true);

    this.driver = new Builder()
        .withCapabilities(capabilities)
        .forBrowser('chrome')
        .build();

    await this.driver.get('http://localhost:4200');

    await this.driver.findElement(By.linkText('Profile')).click();
    await this.driver.wait(until.elementLocated(By.linkText('User login - Passport OIDC')), 10000).click();

    // Now we are at OP side
    await this.driver.wait(until.elementLocated(By.id('loginForm:username')), 10000).sendKeys(name);
    await this.driver.findElement(By.id('loginForm:password')).sendKeys(password);
    await this.driver.findElement(By.id('loginForm:loginButton')).click();

    // user allow for details, optional process for already auth user
    try {
        const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'));
        if (scopeAllowButton) {
            await scopeAllowButton.click();
        }
    } catch (_) {

    }
});

After(async () => {
    await this.driver.close();
});

AfterAll(async () => {
    server.close();
})