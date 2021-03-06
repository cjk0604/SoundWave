var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    flash       = require("connect-flash"),
    methodOverride = require("method-override"),
    session    = require('express-session'),
    mysql = require('mysql');

//requiring routes
var musiclistRoutes   = require("./routes/musiclist"),
    indexRoutes       = require("./routes/index"),
    routeDesignRoutes = require("./routes/routelist"),
    dashboardRoutes   = require("./routes/dashboard.js"),
    con               = require("./models/connection");


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use("/", indexRoutes);
app.use("/musiclist", musiclistRoutes);
app.use("/routelist", routeDesignRoutes);
app.use("/dashboard", dashboardRoutes);




app.listen(3000, process.env.IP, function(){
   console.log(`The Soundwave Music Store Server Has Started! ${process.env.port}`);
});

///Hello
// Good boi
// Let's Go Man City!
