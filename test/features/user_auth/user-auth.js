/* eslint-disable no-empty */
const assert = require('assert')
const {
  After, When, Then, setDefaultTimeout
} = require('cucumber')
const {
  Builder, By, until, Capabilities, Capability
} = require('selenium-webdriver')
const { expect } = require('chai')

require('../../../index')

setDefaultTimeout(20000)

When('user request for profile', async () => {
  this.driver = new Builder()
    .forBrowser('chrome')
    .build()

  await this.driver.get('http://localhost:4200')

  await this.driver.findElement(By.linkText('Profile')).click()
})

Then('user should get login button', async () => {
  await this.driver.sleep(1000)
  const loginButton = await this.driver.wait(until.elementLocated(By.linkText('User login - Passport OXD')), 5000)
  assert(loginButton)
})

When('user click on {string} login button', async (button) => {
  const capabilities = Capabilities.chrome()
  capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true)

  this.driver = new Builder()
    .withCapabilities(capabilities)
    .forBrowser('chrome')
    .build()

  await this.driver.get('http://localhost:4200')

  await this.driver.findElement(By.linkText('Profile')).click()
  await this.driver.sleep(1000)
  await this.driver.wait(until.elementLocated(By.linkText(`User login - Passport ${button}`)), 10000).click()
})

Then('user should get redirected to OP Server', async () => {
  const loginButton = await this.driver.wait(until.elementLocated(By.id('loginForm:loginButton')), 10000)
  assert(loginButton)
})

When('user click on {string} login button, redirect to op and enter credentials {string} and {string}', async (button, name, password) => {
  const capabilities = Capabilities.chrome()
  capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true)

  this.driver = new Builder()
    .withCapabilities(capabilities)
    .forBrowser('chrome')
    .build()

  await this.driver.get('http://localhost:4200')

  await this.driver.findElement(By.linkText('Profile')).click()
  await this.driver.sleep(1000)
  await this.driver.wait(until.elementLocated(By.linkText(`User login - Passport ${button}`)), 10000).click()

  // Now we are at OP side
  await this.driver.sleep(1000)
  await this.driver.wait(until.elementLocated(By.id('loginForm:username')), 10000).sendKeys(name)
  await this.driver.findElement(By.id('loginForm:password')).sendKeys(password)
  await this.driver.findElement(By.id('loginForm:loginButton')).click()

  // user allow for details, optional process for already auth user
  try {
    const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'))
    if (scopeAllowButton) {
      await scopeAllowButton.click()
    }
    // eslint-disable-next-line no-empty
  } catch (_) {

  }
})

Then('user should get redirected back to website and see profile details with name {string}', async (name) => {
  const userName = await this.driver.findElement(By.id('username'))
  expect(await userName.getText()).to.match(new RegExp(name))
})

When('user click on {string} login button, redirect to authz server, select external op server provider {string}', async (button, providerName) => {
  const capabilities = Capabilities.chrome()
  capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true)

  this.driver = new Builder()
    .withCapabilities(capabilities)
    .forBrowser('chrome')
    .build()

  await this.driver.get('http://localhost:4200')

  await this.driver.findElement(By.linkText('Profile')).click()
  await this.driver.sleep(1000)
  await this.driver.wait(until.elementLocated(By.linkText(`User login - Passport ${button}`)), 10000).click()

  // Now we are at authz(OP) server
  await this.driver.wait(until.elementLocated(By.xpath(`//img[@alt="${providerName}"]`)), 10000).click()
})

When('redirect to external OP, enter credentials {string} and {string}, and user authentication', async (username, password) => {
  // Now we are at external OP side
  await this.driver.wait(until.elementLocated(By.id('loginForm:username')), 10000).sendKeys(username)
  await this.driver.findElement(By.id('loginForm:password')).sendKeys(password)
  await this.driver.findElement(By.id('loginForm:loginButton')).click()

  // user allow for details, optional process for already auth user
  try {
    const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'))
    if (scopeAllowButton) {
      await scopeAllowButton.click()
    }
  } catch (_) {

  }
})

When('back to authz server, add and authenticate user', async () => {
  // Now we are at authz server,
  // which get code from url(sent by external op), get token and get userinfo from external op
  // user allow for details, optional process for already auth user

  try {
    const scopeAllowButton = await this.driver.findElement(By.id('authorizeForm:allowButton'))
    await scopeAllowButton.click()
  } catch (_) {
    await new Promise((resolve) => resolve())
  }
})

After(async () => {
  await this.driver.close()
})
