var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - shows all campgrounds on view page
router.get("/campgrounds", function(req, res) {
    //get all the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log("Sorry, there was an error!");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE - creates new campground by adding to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campgrounds page
    //redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log("Sorry, error!");
        } else {
            //redirect to campgrounds page...the redirect defaults to a GET 
            req.flash("success", "Your campground has been added!");
            res.redirect("/campgrounds");
        }
    });
});

//NEW - page with form for adding new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - show information about one campground
router.get("/campgrounds/:id", function(req, res) {
    //find the campground with the provided ID using findById
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render the show template for that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
        
    });
});
    
    // if not redirect
    
   

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;