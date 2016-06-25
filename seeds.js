var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Yellowstone",
        image: "http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20VALLEY.jpg",
        description: "What a great park."
    },
    {
        name: "Yellowstone",
        image: "http://kids.nationalgeographic.com/content/dam/kids/photos/articles/History/M-Z/YELLOWSTONE%20VALLEY.jpg",
        description: "What a great park."
    }
    ];
function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        // if(err) {
        //     console.log(err);
        // } 
        // console.log("Campgrounds removed!");
        // //add a few campgrounds
        // data.forEach(function(seed) {
        //     Campground.create(seed, function(err, campground) {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("Added a campground!");
        //              //add a few comments
        //              Comment.create(
        //                  {
        //                      text: "What a wonder",
        //                      author: "Michael"
        //                  }, function(err, comment) {
        //                      if(err) {
        //                          console.log(err);
        //                      } else {
        //                          campground.comments.push(comment);
        //                          campground.save();
        //                          console.log("Created new comment!");
        //                      }
                             
        //                  });
        //         }
        //     });
        // });
    });
    
    
    
   
}

module.exports = seedDB;
    
    
