const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);

module.exports = app;
