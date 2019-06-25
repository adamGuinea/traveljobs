const express = require("express");
const router = express.Router();

// GET to api/users
// DESC test route
// ACCESS public
router.get("/", (req, res) => res.send("user route"));

module.exports = router;
