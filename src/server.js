const express = require('express');
const morgan = require('morgan');
const settings = require('../package.json');
require('dotenv').config()

const db = require("../src/models");
db.sequelize.sync();

const authRoutes = require('./routes/admin/auth');

const app = express();
app.set('pkg', settings);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

app.listen(3002, () => {
    console.log('Server running on port: 3002')
});