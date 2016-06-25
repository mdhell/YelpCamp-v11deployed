var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           =require("connect-flash"),
    localStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
   
var commentRoutes        = require("./routes/comments"),
    campgroundRoutes     = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");
    
//mongoose.connect("mongodb://localhost/yelp_camp_11");
mongoose.connect("mongodb://Michael:dongXi88@ds023694.mlab.com:23694/hellstromyelpcamp");
// mongodb://Michael:dongXi88@ds023694.mlab.com:23694/hellstromyelpcamp

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seed the database

//CONFIG PASSPORT
app.use(require("express-session") ({
    secret: "My favorite food is beer!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success= req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


// Starting server
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("YelpCamp server started!");
});