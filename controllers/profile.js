var express = require('express');
var db = require("../models");
var passport = require("../config/passportConfig");
var isLoggedIn = require("../middleware/isLoggedIn");
var async = require("async");
var router = express.Router();

router.get("/", isLoggedIn, function(req, res) {
        db.user.find({
            where: { id: req.user.id },
            include: [db.interest]
        })
        .then(function(user){
            // res.send(user);
            res.render("profile", {user: user});
        }).catch(function(error) {
            res.status(400).send("you suck");
        })
});

router.post("/addInt", function(req, res) {
    var interests = [];
    // res.send(req.body)
    db.user.findById(req.body.currentUser)
    .then(function(user){
        if(req.body.interests) {
            interests = req.body.interests.split(",");
        }
        if(interests.length) {
            async.forEachSeries(interests, function(i, cb) {
                db.interest.findOrCreate({
                    where: {interest: i.trim().toLowerCase()}
                }).spread(function(newInt, wasCreated){
                    if(newInt) {
                        user.addInterest(newInt);
                    }
                    cb(null);
                });
            }, function() {
                res.redirect("/profile");
            });
        } else {
            res.redirect("/profile");
        }
    })
    .catch(function(error) {
        res.status(400).send("Error. Sorry bro");
    })
});

router.delete('/del/:id', function(req, res) {
	db.user.findOne({
		where: {id: req.user.id},
        include: [db.interest]
    }).then(function(user) {
        db.interest.findOne({
            where: { id: req.params.id},
        }).then(function(interest) {
            user.removeInterest(interest);
            res.send({"redirect":"/profile"})
        })
    })
})

router.get("/edit", function(req, res){
    res.render("profileEdit");
})

router.post("/edit", function(req, res) {
    // res.send(req.user)
    db.user.update({
            priceRange:req.body.price,
            area:req.body.area.toLowerCase(),
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

router.get("/:id", function(req, res) {
    db.user.find({
        where: {id: req.params.id },
        include: [db.interest]
    }).then(function(user) {
        res.render("profile/userProfile", {user: user});
    })
    .catch(function(error){
        res.status(400).send("shit");
    });
});

// EXPORTS
module.exports = router;