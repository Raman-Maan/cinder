/**
 * These are the endpoints for user recommendation operations
 */
const express = require('express');
const router = express.Router({ mergeParams: true });
const recsDB = require('./db/recs');
const util = require('./util');
const responses = require('./responses');

router.get('/', (req, res, next) => {
  const { userID } = req.params;
  util.validateID(userID);

  return recsDB
    .getRecs(userID)
    .then(recs => res.status(responses.SUCCESS).json(recs))
    .catch(next);
});

/**
 * Error handler
 */
router.use((err, req, res, next) => {
  if (err.message.indexOf('[INTERNAL]')) {
    //eslint-disable-next-line no-console
    console.error(err.message);
    return res.status(responses.BAD_REQUEST).send(err.message);
  }

  next(err);
});

router.use((err, req, res, next) => {
  //eslint-disable-next-line no-console
  console.error(err.message);
  res.status(responses.SERVER_ERROR).send(err.message);
});

module.exports = router;
