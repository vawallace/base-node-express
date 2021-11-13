const express = require('express');
const router = express.Router();
const authentication  = require('../controllers/auth.controller');

router.post('/signup', authentication.signUp);
router.post('/login', authentication.logIn);
router.post('/refresh', authentication.refresh);

module.exports = router;