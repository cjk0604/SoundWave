var express = require("express");
var router = express.Router();

var con = require("../models/connection");

// -------------------------------------------------------------------------- //

let newMusiclist = {name: "", image: "", description: "", price: 0}

let albumList = [
  {name: "Beatles", image: "https://elsewhere.scdn3.secure.raxcdn.com/images/v95000/articles/41fc1c0d3eef130d3ae5c4ba9d2900fc.jpg", _id:"0", price: 12},
  {name: "Queen", image: "https://images-na.ssl-images-amazon.com/images/I/5193WwLsvgL._SX384_BO1,204,203,200_.jpg", _id:"1", price: 13}
]


//INDEX - show all music list
router.get("/", function (req, res) {
    // Get all music list from DB
    var q = "select * from albums";
    con.query(q, function(err, albumlist_){
      if(err) console.log(err);

      console.log("done!");

            res.render("musiclist/index", {musiclist: albumlist_, currentUser: ""});
        })
      });

//CREATE - add new musiclist to DB
router.post("/", function (req, res) {
    // get data from form and add to musiclist array

    var name = req.body.name;
    console.log(req.body);
    var quantity = parseInt(req.body.quantity);
    console.log(quantity);
      console.log(typeof quantity);
    var image = req.body.image;
    var desc = req.body.description;
    var price = parseFloat(req.body.price);
    console.log(typeof price);
    //newMusiclist = {name: name, image: image, description: desc, price: price}
    // albumList.push(newMusiclist);
    // var q = `INSERT INTO albums SET ?`, {title: name, price: price, quantity: quantity, description: desc, image: image}
    con.query(`INSERT INTO albums SET ?`, {title: name, price: price, quantity: quantity, description: desc, image: image}, function(err, results){
        if(err) console.log(err);
      //  var count = results[0].count;con
        //res.render("home", {count: count});
        console.log("UPDATE");
        console.log(results);
    });
        var qq = "select * from albums";
        con.query(qq, function(err, albumlist){
          if(err) console.log(err);

          console.log("done!");
          res.render("musiclist/index", {musiclist: albumlist, currentUser: ""});
        })
});

//NEW - show form to create new musiclist
router.get("/new", function (req, res) {
    res.render("musiclist/new", {currentUser: ""});
});

// SHOW - shows more info about one musiclist
router.get("/:id", function (req, res) {
    let music_id = req.params.id;
    console.log(music_id);

    var s = `select * from albums where id=${music_id}`;
    console.log(s);

    con.query(s, function(err, albumlist){
      if(err) console.log(err);

      console.log("done!");
      console.log(albumlist);
    //let foundMusiclist = select * from albumlists where id = music_id
    //find the musiclist with provided ID from database
    // let  foundMusiclist = {name: "Twice", image: "https://i.ytimg.com/vi/mg1QGwSzKLM/maxresdefault.jpg", _id:"1", description: "2nd Album", price: 15};
            //render show template with that musiclist
            res.render("musiclist/show", {musiclist: albumlist, currentUser: ""});
        });
    });

// EDIT MUSICLIST ROUTE
router.get("/:id/edit", function (req, res) {
  let music_id = req.params.id;
  console.log(music_id);

  var sss = `select * from albums where id=${music_id}`;
  console.log(sss);

  con.query(sss, function(err, albumlist){
        if(err) console.log(err);

        console.log("done!");
        console.log(albumlist)

        res.render("musiclist/edit", {musiclist: albumlist, currentUser: ""});
      });
});

// UPDATE MUSICLIST ROUTE
// router.put("/:id", function (req, res) {
//
//         //redirect somewhere(show page)
//         res.redirect("/musiclist/");
//
// });

// DESTROY MUSICLIST ROUTE
router.post("/:id", function (req, res) {
    let music_id = req.params.id;
    var ss = `DELETE FROM albums where id=${music_id}`;
    console.log(ss);

    con.query(ss, function(err, delete_id){
          if(err) console.log(err);

          console.log("done!");
          console.log(delete_id);

        res.redirect("/musiclist/");
      });
});

module.exports = router;
