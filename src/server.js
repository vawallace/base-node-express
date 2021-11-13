const express = require('express');
const morgan = require('morgan');
const settings = require('../package.json');
require('dotenv').config()

const authRoutes = require('./routes/auth');

const app = express();
app.set('pkg', settings);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server running on port: 3000')
});