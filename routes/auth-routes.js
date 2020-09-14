const router = require('express').Router()
const passport = require('passport')
const bodyParser = require('body-parser')

const strategies = ['oxd', 'oidc', 'saml']

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})

// auth login
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/auth/login')
})

strategies.forEach((strategy) => {
  // auth with gluu
  router.get(`/${strategy}`, passport.authenticate(strategy, {}))

  // redirect uri
  router.get(`/${strategy}/redirect`, passport.authenticate(strategy), (req, res) => {
    res.redirect('/profile')
  })
})

// SAML assertion require HTTP Post handler
router.post('/saml/redirect',
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function (req, res) {
    res.redirect('/profile')
  }
)

// auth with gluu passport saml
router.get('/inbound_saml', passport.authenticate('oxd', { acr_values: ['passport_saml'] }))

module.exports = router
