const router = require('express').Router()
const passport = require('passport')

const strategies = ['oxd', 'oidc']

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

module.exports = router
