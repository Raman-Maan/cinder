const express = require('express');

const router = express.Router();

/**
 * Collection of different API endpoints organized by data model
 */
const userEndpoints = require('./__users');
const matchEndpoints = require('./__matches');
const refEndpoints = require('./__ref');

/**
 * Attach endpoints to route
 */
router.use('/users', userEndpoints);
router.use('/users/:userID/matches', matchEndpoints);
router.use('/ref', refEndpoints);

module.exports = router;
