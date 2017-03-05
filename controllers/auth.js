var express = require('express');
var db = require("../models");
var passport = require("../config/passportConfig");
var router = express.Router();

// ROUTES
router.get("/profile", function(req, res) {
    res.render("auth/profile");
});

router.post("/profile", passport.authenticate("local", {
    successRedirect: "/",
    successFlash: "Good Job",
    failureRedirect: "/",
    failureFlash: "Invalid Credentials"
}));

router.get("/signup", function(req, res) {
    res.render("auth/signup");
});

router.post("/signup", function(req, res) {
    console.log(req.body)

    db.user.findOrCreate({
        where: {
            email: req.body.email,
        },
        defaults: {
            fname: req.body.fname,
            lname: req.body.lname,
            password: req.body.password
        }
    }).spread(function(user, wasCreated){
        if(wasCreated) {
            // GOOOOOOD
            passport.authenticate("local", {
                successRedirect: '/',
                successFlash: "Account create and logged in"
            })(req, res);
        } else {
            // UNGOOOOOOD
            req.flash("error", "Email was already used.");
            res.redirect("/auth/login");
        }
    }).catch(function(err){
        req.flash('error', err.message);
        res.redirect("/auth/signup");
    })
});

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/");
});

// EXPORTS
module.exports = router;