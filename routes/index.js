var express = require("express");
var router  = express.Router();
var connection = require("../models/connection");

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
    let username = req.body.username;
    let password = req.body.username;
    if(username && password){
      connection.query(`INSERT INTO users SET ?`, {username: username, password: password, email: "test@gmail.com"}, function(error, results, fields){
        if(error){
          res.redirect('/register');
        } else {
          req.session.loggedin = true;
  				req.session.username = username;
          req.session.shoppingCart = [];
          console.log(req.session.username);
  				res.redirect('/musiclist');
        }
      });
    }else{
      res.redirect('/register');
    }
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {currentUser: ""});
});

//handling login logic
router.post("/login", function(request, response){

    let username = request.body.username;
  	let password = request.body.password;
  	if (username && password) {
  		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
  			if (results.length > 0) {
  				request.session.loggedin = true;
  				request.session.username = username;
          request.session.isAdmin = results[0].is_admin;
          request.session.shoppingCart = [];
          console.log(results[0].is_admin);
          console.log(request.session.username);
  				response.redirect('/musiclist');
  			} else {
  				response.redirect('/login');
  			}
  		});
  	} else {
  		response.redirect('/login');
  	}
});


// logout route
router.get("/logout", function(req, res){
   req.session.username = null;
   req.session.loggedin = false;
   req.session.isAdmin = null;
   req.session.shoppingCart = [];
   res.redirect('/musiclist');
});



module.exports = router;
