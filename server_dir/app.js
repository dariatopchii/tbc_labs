const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');
const contentRoutes = require('./routes/content');

const app = express();
app.use(bodyParser.json());

app.use('/api', webhookRoutes);
app.use('/api', contentRoutes);

module.exports = app;
