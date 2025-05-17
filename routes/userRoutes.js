const express = require('express');
const router = express.Router();


const { createNewUser, login,getAllUser,toggleUserRole,adminLogin } = require('../controllers/UserController');

router.get('/',getAllUser)
router.post('/auth/signup', createNewUser);
router.post('/auth/login', login);
router.put('/:id/updaterole',toggleUserRole)
router.post('/admin/login',adminLogin)
module.exports = router;
