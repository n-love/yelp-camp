var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://source.unsplash.com/dQwijI66_Jw",
        description: "Doggo ipsum smol wrinkler you are doing me a frighten mlem ur givin me a spook waggy wags heckin good boys woofer, heckin angery woofer pupper dat tungg tho long water shoob doing me a frighten. I am bekom fat long doggo he made many woofs, borkf. you are doin me a concern. You are doing me the shock very jealous pupper fat boi heckin fat boi, long water shoob smol borking doggo with a long snoot for pats woofer."
    },
    {
        name: "Desert Mesa", 
        image: "https://source.unsplash.com/eyoKIj3WTY4",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod teShibe very jealous pupper extremely cuuuuuute boof many pats, super chub borkdrive I am bekom fat very taste wow borking doggo, pats borkf pats. H*ck borkdrive puggo very good spot fluffer wow such tempt, clouds noodle horse borking doggo what a nice floof. Blep super chub aqua doggo shoob, borkf such treat. Adorable doggo noodle horse boofers heckin angery woofer big ol pupper snoot long doggo heckin good boys and girls clouds, blop boof I am bekom fat what a nice floof aqua doggo floofs h*ck. Ruff vvv the neighborhood pupper boofers waggy wags fluffer wow very biscit I am bekom fat, clouds ur givin me a spook shibe shooberino long water shoob." 
    },
    {
        name: "Canyon Floor", 
        image: "https://source.unsplash.com/3fJOXw1RbPo",
        description: "Very good spot heckin good boys bork vvv, doge long water shoob. Stop it fren blop thicc you are doing me a frighten, shooberino heckin good boys and girls. Ruff the neighborhood pupper pupper long woofer you are doing me the shock, wow such tempt maximum borkdrive borkdrive clouds ur givin me a spook, shoob pupperino many pats. Shibe pats what a nice floof, smol. Waggy wags puggo the neighborhood pupper very good spot heck, aqua doggo mlem. Waggy wags noodle horse wow very biscit, wrinkler. Doge he made many woofs long bois shibe, maximum borkdrive very good spot. Waggy wags he made many woofs sub woofer big ol stop it fren, the neighborhood pupper borking doggo. Fat boi long water shoob shibe what a nice floof big ol pupper porgo, clouds long water shoob floofs shibe. Boof wow such tempt pupper doggorino woofer, heck very jealous pupper."
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;