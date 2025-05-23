const express = require('express');
const router = express.Router();
const {getAllSignwords,getSignwordByLabel} = require('../controllers/signwordController');

router.get('/', getAllSignwords);
router.get('/:label', getSignwordByLabel); // new route

module.exports = router;
