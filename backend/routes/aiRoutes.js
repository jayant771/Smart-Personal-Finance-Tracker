const express = require("express");
const { getAISuggestions } = require("../controllers/aiController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/suggestion", protect, getAISuggestions);

module.exports = router;
