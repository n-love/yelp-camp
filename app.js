var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
    app         = express();
    
seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
       if (err){
           console.log(err);
       } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});       
       }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCamp = {name: name, image: image, description: desc};
    // Create a new campground and save to DB
    Campground.create(newCamp, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
       }
    });
});

app.get("/campgrounds/:id", function(req, res) {
    //Find the campground w/ ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
            //Render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground}); 
       }
    });
    
});


// COMMENTS Routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
   //Find the campground w ID
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
            //Render show template with that campground
            res.render("comments/new", {campground: foundCampground}); 
       }
    });
});

app.post("/campgrounds/:id/comments",function(req, res){
   //Find the campground w/ ID
   Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //Create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //Connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    
                    //Redirect campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
   });
   
   
   
});

// Tells app to listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp start . . . "); 
});