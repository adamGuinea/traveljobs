const express = require("express");
const router = express.Router();

// GET to api/posts
// DESC test route
// ACCESS public
router.get("/", (req, res) => res.send("post route"));

module.exports = router;
