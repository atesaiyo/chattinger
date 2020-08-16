const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.render("server is ready!!!");
});

module.exports = router;
