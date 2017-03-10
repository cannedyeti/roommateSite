var express = require('express');
var db = require("../models");
var passport = require("../config/passportConfig");
var router = express.Router();

// ROUTES
router.post("/profile", passport.authenticate("local", {
    successRedirect: "/profile",
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
            username: req.body.username
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
                successRedirect: '/auth/signup2',
                successFlash: "Account created and logged in, please let us know more about you."
            })(req, res);
        } else {
            // UNGOOOOOOD
            req.flash("error", "Email/Username was already used.");
            res.redirect("/auth/login");
        }
    }).catch(function(err){
        req.flash('error', err.message);
        res.redirect("/auth/signup");
    })
});

router.post("/signup2", function(req, res) {
    // res.send(req.body)
        db.user.update({
            priceRange:req.body.price,
            area: req.body.area.toLowerCase(),
            gender: req.body.gender,
            pets: req.body.pets,
            cleanliness: req.body.cleanliness,
            dob: req.body.dob,
            smokes: req.body.smokes,
            bio: req.body.bio,
            occupation: req.body.occupation
    }, {
        where: {email: req.user.email}
    }).then(function(updatedProfile) {
        res.redirect("/profile");
    });
});
    

router.get("/signup2", function(req, res) {
    res.render("auth/signup2")
});


router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/");
});

// EXPORTS
module.exports = router;