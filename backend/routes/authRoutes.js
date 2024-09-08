// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/jwtUtils');

const router = express.Router();

// Google Authentication
router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`/success?token=${token}`);
  }
);

// Facebook Authentication
router.get(
  '/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/oauth2/redirect/facebook',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    failureMessage: true,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`/success?token=${token}`);
  }
);

module.exports = router;
