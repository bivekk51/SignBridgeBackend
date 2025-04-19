const express = require('express');
const router = express.Router();


const { createNewUser, login } = require('../controllers/UserController');


router.post('/signup', createNewUser);
router.post('/login', login);

module.exports = router;
