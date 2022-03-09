const express = require('express');
const router = express.Router();
const user = require('../controllers/users/user.controller')

router.get('/', user.findAll);
router.get('/:id', user.findOne);

router.post('/', user.create);
router.put('/:id', user.update);
router.delete('/:id', user.delete);

module.exports = router;