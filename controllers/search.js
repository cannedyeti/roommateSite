var express = require('express');
var db = require("../models");
var passport = require("../config/passportConfig");
var router = express.Router();

router.get("/", function(req, res) {
    res.render("search");
});


module.exports = router;