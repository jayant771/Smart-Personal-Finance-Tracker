const express = require("express");
const { getAnalytics } = require("../controllers/transactionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getAnalytics);
router.get("/analytics", protect, getAnalytics);

module.exports = router;
