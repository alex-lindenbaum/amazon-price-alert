const express = require('express');
const router = express.Router();
const passport = require('passport');

// Passport configuration
require('../passport');

const { validateBody, schemas } = require('../helpers/validate');
const AuthController = require('../controllers/auth');

const passportSignin = passport.authenticate('local', { session: false });

router.post('/signup', validateBody(schemas.authSchema), AuthController.signUp);

router.post('/signin', validateBody(schemas.authSchema), passportSignin, AuthController.signIn);

module.exports = router;