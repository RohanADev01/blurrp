// config/passportConfig.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const User = require('../models/userModel'); // Sequelize Model
const { v4: uuidv4 } = require('uuid');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth2/redirect/google',
      scope: ['profile', 'email'],
      state: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const provider = 'https://accounts.google.com';
        const existingUser = await User.findOne({
          where: { google_id: profile.id },
        });

        if (existingUser) {
          return cb(null, existingUser);
        } else {
          const newUser = await User.create({
            user_id: uuidv4(),
            email: profile.emails[0].value,
            name: profile.displayName,
            google_id: profile.id,
            role: 'customer', // Default role, could be modified based on your logic
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err, false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/oauth2/redirect/facebook',
      profileFields: ['id', 'emails', 'name'],
      state: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const provider = 'https://www.facebook.com';
        const existingUser = await User.findOne({
          where: { facebook_id: profile.id },
        });

        if (existingUser) {
          return cb(null, existingUser);
        } else {
          const newUser = await User.create({
            user_id: uuidv4(),
            email: profile.emails[0].value,
            name: profile.displayName,
            facebook_id: profile.id,
            role: 'customer', // Default role, could be modified based on your logic
          });
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err, false);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.user_id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user);
  } catch (err) {
    cb(err, false);
  }
});
