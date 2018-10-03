var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: 'Granite Hill',
//         image: 'https://source.unsplash.com/dQwijI66_Jw',
//         description: "This is a huge granit hill. No bathrooms. No water. Just Beautiful~ Granite!"
        
//     }, function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });

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
            res.render("index", {campgrounds: campgrounds});       
       }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
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
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
            //Render show template with that campground
            res.render("show", {campground: foundCampground}); 
       }
    });
    
});

// Tells app to listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp start . . . "); 
});