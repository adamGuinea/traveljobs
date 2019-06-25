const express = require("express");
const router = express.Router();

// GET to api/profile
// DESC test route
// ACCESS public
router.get("/", (req, res) => res.send("profile route"));

module.exports = router;
