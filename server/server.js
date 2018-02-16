const express = require('express');
require('dotenv').load();

const app = express();
const port = process.env.SERVER_PORT || 5000;

const api = require('./_api/__api.js');

// Attach api routes to app
app.use('/api/', api);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`cinder server started on port ${port}`));
