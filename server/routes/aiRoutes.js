const express = require("express");
const router = express.Router();
const { 
    generateResponse,
    generateStream
 } = require("../controllers/textAiController");

router.post("/text/generate", generateResponse);
router.post("/text/stream", generateStream);

module.exports = router;