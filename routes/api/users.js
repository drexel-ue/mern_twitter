const express = require("express");
const router = express.Router();

// NB: The callback for every Express route requires a request and response as arguments.
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;
