const express = require('express');
const router = express.Router();
const passport = require('passport');

// Passport configuration
require('../passport');

const { validateBody, schemas } = require('../helpers/validate');
const ItemsController = require('../controllers/items');

const passportJwt = passport.authenticate('jwt', { session: false });

router.get('/all', passportJwt, ItemsController.getItems);

router.post('/save', validateBody(schemas.newItemListSchema), passportJwt, ItemsController.saveItems);

module.exports = router;