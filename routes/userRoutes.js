const express = require('express');

const router = express.Router();

const { register, login, getCurrentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/register', register);

router.post('/login', login);

router.get('/current',validateToken,getCurrentUser);

module.exports = router;

