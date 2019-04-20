var express = require("express");
var router  = express.Router();

let albumList = [
  {name: "Twice", image: "https://i.ytimg.com/vi/mg1QGwSzKLM/maxresdefault.jpg", _id:"0", price: 12},
  {name: "Queen", image: "https://images-na.ssl-images-amazon.com/images/I/5193WwLsvgL._SX384_BO1,204,203,200_.jpg", _id:"1", price: 13}
]

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {currentUser: ""});
});

//handle sign up logic
router.post("/register", function(req, res){
           res.redirect("/musiclist", {currentUser: ""});
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {currentUser: " "});
});

//handling login logic
router.post("/login", function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    //const userID = {username: "admin", password: "123"};
    var userQuery = `select * from users where id = ${username}`
    var passwordQuery = `select * from users where id = ${password}`


    if(req.body.username === "admin" && req.body.password === "1234"){
      res.render("musiclist", {musiclist: albumList, currentUser: userID}, )
    }
    else{
      res.render("login", {currentUser: ""});
    }
});

// logout route
router.get("/logout", function(req, res){
   res.redirect("/musiclist", {currentUser: ""});
});



module.exports = router;
