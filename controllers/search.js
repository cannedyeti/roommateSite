var express = require('express');
var db = require("../models");
var passport = require("../config/passportConfig");
var isLoggedIn = require("../middleware/isLoggedIn");
var router = express.Router();

router.get("/", isLoggedIn, function(req, res) {
    res.render("search");
});

router.post("/", function(req, res) {
    db.user.findAll({
        where: {
            smokes: req.body.smoking,
            priceRange: req.body.price,
            area: req.body.area,
            id: {
                $notIn: [req.user.id]
            }
        }, include: [db.interest]
    }).then(function(matches) {
        res.render("search/matches", {matches: matches});
    })

})

module.exports = router;