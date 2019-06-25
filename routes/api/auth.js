const express = require("express");
const router = express.Router();

// GET to api/auth
// DESC test route
// ACCESS public
router.get("/", (req, res) => res.send("auth route"));

module.exports = router;
