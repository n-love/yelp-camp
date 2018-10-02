var express = require("express"),
bodyParser = require("body-parser"),
app = express();

var campgrounds = [
    {name: "Salmon Creek", image: "https://source.unsplash.com/pSaEMIiUO84"},
    {name: "Granite Hill", image: "https://source.unsplash.com/dQwijI66_Jw"},
    {name: "Mountain Goat's Rest", image: "https://source.unsplash.com/eDgUyGu93Yw"}
];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    campgrounds.push(newCamp);
    
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

// Tells app to listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp start . . . "); 
});