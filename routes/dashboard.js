let express = require("express");
let router  = express.Router();
let connection = require("../models/connection");

//admin dashboard route
router.get("/", function(req, res){
    let all_users_query = `select * from users`;
    let all_album_query = `select * from albums`;
    let all_order_query = `select * from orders`;

    // find all users from db
    connection.query(all_users_query, function(err, allusers){
      if(err){
        console.log(allusers);
      }else{
        let allusers_in_array = allusers;
        console.log(allusers_in_array);
        // find all albums from db
        connection.query(all_album_query, function(err, allAlbums){
          if(err){
            console.log(allAlbums);
          }else{
            let allAlbums_in_array = allAlbums;
            console.log(allAlbums_in_array);
            connection.query(all_order_query, function(err, allOrders){
              if(err){
                console.log(err);
              }
              else{
                console.log(allOrders);
                res.render("dashboard/dashboard", {currentUser: req.session.username, users: allusers_in_array, albums: allAlbums_in_array, allOrders: allOrders});
              }
            })

          }
        })
      }
    });
});


// show user information enquiry page
router.get("/:username", function(req, res){
  let username = req.params.username;
  var q = `select * from users where username="${username}"`;
  connection.query(q, function(err, userinfo){
    if(err){
      console.log(err);
    }
    else{
      console.log(userinfo[0]);
        res.render("dashboard/user", {currentUser: req.session.username, userinfo: userinfo[0]});
    }
  })
});

// Update user information
router.put("/:username", function(req, res){
  let username_ = req.body.username_;
  let email = req.body.email;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;

  let update_query = `UPDATE users SET email="${email}", first_name="${first_name}", last_name="${last_name}" where username = "${username_}"`
  //redirect somewhere(show page)
  connection.query(update_query, function(err, updated_item){
    if(err){
      console.log(err);
    }
    console.log(updated_item);
    res.redirect("/musiclist/");
  })
});

// show user order Record
router.get("/:username/order", function(req, res){
    let username = req.params.username;
    let order_query = `select * from orders where username = "${username}"`;
    connection.query(order_query, function(err, orders){
      if(err){
        console.log(err);
      }
      else{
        console.log(orders);
        res.render("dashboard/order", {orders: orders, currentUser: req.session.username});
      }
    })
})

router.post("/:username/order", function(req, res){
  let username = req.params.username;
  let order_id = req.body.id;
  let order_price = parseInt(req.body.price);
  console.log("============price===============")
  console.log(order_price);

  console.log("============username===============")
  console.log(username);

  console.log(order_id);
  let date_diff = `select data_of_order from orders where id = ${order_id}`;
  let refund_query = `select datediff(now(), (${date_diff})) as difference`;

  connection.query(refund_query, function(err, datedifference){
    if(err){
      console.log(err);
    }
    else{
      console.log(datedifference);
      let difference = datedifference[0].difference;

        if(difference > 3){
          let refund_status = `UPDATE orders SET refund_status ='L' where id = "${order_id}"`;
            connection.query(refund_status, function(err, results){
              console.log(results);
            });
        }
        else{

            let delete_order_query = `DELETE FROM orders where id = ${order_id}`;
            connection.query(delete_order_query, function(err, delete_result){
              console.log(delete_result);
                let loyalty_refund_query = `UPDATE users SET loyal_point = loyal_point + ${order_price} where username = "${username}"`;
                  connection.query(loyalty_refund_query, function(err, loyalty_results){
                    console.log("============loyal point update===============")
                    console.log(loyalty_results);
                  })
            })
        }
    }
    res.redirect(`/dashboard/${username}`);
  })
})

router.put("/order/:username", function(req, res){
  let total_loyal_added = 0.0;
  let username = req.body.username;
  let album_id = req.body.album_id;
  let album_title = req.body.album_title;
  let album_price = req.body.album_price;

  console.log("==================test test test test===============");

  console.log(req.body);
  console.log(req.body.username);

  for(let i=0; i<req.body.username.length; i++){
    let loyalty_point_given = parseFloat(album_price) * 0.1;
    total_loyal_added = total_loyal_added + loyalty_point_given;

    let payment_query = `INSERT INTO orders SET ?`

    connection.query(payment_query,{username: username[i], album_id: album_id[i], price: album_price[i]} ,function(err, updated_item){
      if(err){
        console.log(err);
      }
        console.log(updated_item);
        let loyalty_quey = `select * from users where username = "${username[i]}"`;
            connection.query(loyalty_quey, function(err, user){
              if(err){
                console.log(err);
              }
                else {
                    let current_loyalty_point =  user.loyal_point;
                    current_loyalty_point += total_loyal_added;
                    let loyalty_update_query = `UPDATE users SET loyal_point="${current_loyalty_point}" where username = "${username[i]}"`
                    connection.query(loyalty_update_query, function(err, updated_user){
                      if(err){
                        console.log(err);
                      }
                      else{
                        console.log(updated_user);
                      }
                    })
                }
            })

    })
  }
  req.session.shoppingCart = [];
  res.redirect("/musiclist/");

  // 10% of the album price
  // let loyalty_point_given = parseInt(album_price) * 0.1;
  //
  // let payment_query = `INSERT INTO orders SET ?`
  // let update_query = `UPDATE users SET email="${email}", first_name="${first_name}", last_name="${last_name}" where username = "${username_}"`
  // //redirect somewhere(show page)
  // connection.query(payment_query,{username: username, album_id: album_id, quantity: quantity, description: desc, image: image} ,function(err, updated_item){
  //   if(err){
  //     console.log(err);
  //   }
  //   console.log(updated_item);
  //   res.redirect("/musiclist/");
  // })
});


module.exports = router;
