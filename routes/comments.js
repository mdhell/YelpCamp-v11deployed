var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//NEW COMMENT ROUTE
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//CREATE POST COMMENT ROUTE
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res) {
    // look up campground by campground ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
             // create new comment
             Comment.create(req.body.comment, function(err, comment) {
                 if(err) {
                     req.flash("error", "Sorry, something went wrong...");
                     console.log(err);
                 } else {
                     //connect the comment to the campground
                    //  add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    //redirect somewhere
                    req.flash("success", "Your comment has been added!");
                    res.redirect("/campgrounds/" + campground._id);
                 }
             });
        }
    });
});

// EDIT COMMENT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    //look up comment associated with that campground
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router;