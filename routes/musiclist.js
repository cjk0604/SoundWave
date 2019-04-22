var express = require("express");
var router = express.Router();
// var song = require("/sound_wave_song.mp3");


var con = require("../models/connection");

// app.get("/", function(req, res){
//     // Find count of users in DB
//     var q = "SELECT COUNT(*) AS count FROM users";
//     con.query(q, function(err, results){
//         if(err) throw err;
//       //  var count = results[0].count;con
//         //res.render("home", {count: count});
//         console.log("connect!");
//     });
// });

// --------------------

let newMusiclist = {name: "", image: "", description: "", price: 0}

let albumList = [
  {name: "Beatles", image: "https://elsewhere.scdn3.secure.raxcdn.com/images/v95000/articles/41fc1c0d3eef130d3ae5c4ba9d2900fc.jpg", _id:"0", price: 12},
  {name: "Queen", image: "https://images-na.ssl-images-amazon.com/images/I/5193WwLsvgL._SX384_BO1,204,203,200_.jpg", _id:"1", price: 13}
]

// ============= ROUTES ==============
// Define escapeRegex function to avoid regex DDoS attack
// const escapeRegex = text => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

//INDEX - show all music list
router.get("/", function (req, res) {
  let noMatch = null;
  console.log(req.query.search);
    if (req.query.search) {
      // const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      let search_query = `select * from albums where title like "%${req.query.search}%"`;
      con.query(search_query, function(err, albumlist_){
        if(err){ console.log(err);}
        else{
          if(albumlist_.length < 1){
            noMatch = "No albums found, pleaes try again.";
          }
          res.render("musiclist/index", {musiclist: albumlist_, currentUser: req.session.username, noMatch: noMatch, is_admin: req.session.isAdmin});
        }
      });
    }
    else{
    // Get all music list from DB
    var q = "select * from albums";
    con.query(q, function(err, albumlist_){
      if(err) console.log(err);

      let userloggedin = req.session.username;

            res.render("musiclist/index", {musiclist: albumlist_, currentUser: userloggedin, noMatch: noMatch, is_admin: req.session.isAdmin});
        })
      }
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
        var q = "select * from albums";
        con.query(q, function(err, albumlist){
          if(err) console.log(err);

          console.log("done!");
          res.render("musiclist/index", {musiclist: albumlist, currentUser: req.session.username, noMatch: null, is_admin: req.session.isAdmin});
        })
});

//NEW - show form to create new musiclist
router.get("/new", function (req, res) {
    res.render("musiclist/new", {currentUser: req.session.username});
});

// SHOW - shows more info about one musiclist
router.get("/:id", function (req, res) {
    let music_id = req.params.id;
    console.log(music_id);

    let q = `select * from albums where id=${music_id}`;

    con.query(q, function(err, foundMusiclist){
      if(err) console.log(err);
         console.log(foundMusiclist);
      res.render("musiclist/show", {musiclist: foundMusiclist, currentUser: req.session.username, is_admin: req.session.isAdmin, song: "sound_wave_song.mp3"});

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

        res.render("musiclist/edit", {musiclist: albumlist, currentUser: req.session.username});
      });
});

// UPDATE MUSICLIST ROUTE
router.put("/:id", function (req, res) {
        console.log(req.body);
        let title = req.body.musiclist.name;
        let image = req.body.musiclist.image;
        let price = req.body.musiclist.price;
        let description = req.body.musiclist.description;
        let music_id = req.params.id;
        console.log(title);

        let update_query = `UPDATE albums SET title="${title}", image="${image}", price=${price}, description="${description}" where id = ${music_id}`
        //redirect somewhere(show page)
        con.query(update_query, function(err, updated_item){
          if(err){
            console.log(err);
          }
          console.log(updated_item);
          res.redirect("/musiclist/");
        })
});

// DESTROY MUSICLIST ROUTE
router.post("/:id", function (req, res) {
    let __id = req.params.id;
    let sss = `DELETE FROM albums where id = ${__id}`;
    con.query(sss, function(err, deleted_item){
      if(err){
        console.log(err);
      }
      console.log(deleted_item);
      res.redirect("/musiclist/");
    })
      // albumList.pop();
      //   res.render("musiclist/index", {musiclist: albumList, currentUser: ""});
});

// Add to Shopping Cart Route
router.post("/:id/shoppingCart", function(req, res){
  let album_id = req.body.id;
  let username = req.session.username;
  let album_title = req.body.title;
  let album_price = req.body.price;
  let shoppingCart = req.session.shoppingCart
  if(!filtering(shoppingCart, album_id)){
    req.session.shoppingCart.push({album_id: album_id, username: username, album_title: album_title, album_price: album_price});
  }
  console.log(req.session.shoppingCart);
  res.redirect("/musiclist");

})

router.get("/:id/shoppingCart", function(req, res){
    console.log(req.session.shoppingCart);

  // let user_query = `select * from users where username="${username}"`;
  // let album_query = `select * from albums where id="${album_id}"`;
  // con.query(user_query, function(err, userlist){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     console.log(userlist);
  //     con.query(album_query, function(err, albumlist){
  //       if(err){
  //         console.log(err)
  //       }
  //       else{
  //         console.log(albumlist);
          res.render("shoppingCart/cart", {currentUser: req.session.username, shoppingCart: req.session.shoppingCart});
  //       }
  //     })
  //   }
  // })
});


// verify if there is duplicate album in the shoppingCart
function filtering(vendors, albumID){
  let found = false;
  for(var i = 0; i < vendors.length; i++) {
      if (vendors[i].album_id == albumID) {
          found = true;
          break;
      }
  }
  return found;
}


module.exports = router;
