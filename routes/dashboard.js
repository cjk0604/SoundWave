var express = require("express");
var router  = express.Router();

//root route
router.get("/", function(req, res){
    res.render("dashboard/dashboard");
});

router.get("/edit", function(req, res){
  res.render("dashboard/user");
})

module.exports = router;
