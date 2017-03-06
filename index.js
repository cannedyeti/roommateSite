// GLOBALS 
var express = require("express");
var session = require("express-session");
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var passport = require("./config/passportConfig");
var isLoggedIn = require("./middleware/isLoggedIn");
var db = require("./models");
var async = require("async");
require("dotenv").config();
var app = express();

// SET AND USE
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    next();
});
app.use(express.static(__dirname + "/public"));

// ROUTES
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/profile", isLoggedIn, function(req, res) {
        db.user.find({
            where: { id: req.user.id },
            include: [db.interest]
        })
        .then(function(user){
            // res.send(user);
            res.render("profile", {user: user});
        }).catch(function(error) {
            res.status(400).send("fuck you");
        })
});

app.post("/profile/addInt", function(req, res) {
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
        res.status(400).send("error btch");
    })
});

app.get("/profile/edit", function(req, res){
    res.render("profileEdit");
})

// CONTROLLERS
app.use("/auth", require("./controllers/auth"));
app.use("/search", require("./controllers/search"));



// LISTEN
app.listen(3000);
