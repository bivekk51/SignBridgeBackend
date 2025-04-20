const express = require("express");
const router = express.Router();
const signController = require("../controllers/signController");

router.get("/", signController.getAllSigns);
router.get("/:label", signController.getSignByLabel);
router.post("/", signController.createSign); // New route

module.exports = router;
