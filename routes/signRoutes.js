const express = require("express");
const router = express.Router();
const {getAllSigns,getSignByLabel} = require("../controllers/signController");

router.get("/", getAllSigns);
router.get("/:label",getSignByLabel);


module.exports = router;
