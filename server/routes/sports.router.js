const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    // send back user object from database
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const city = req.body.city;
  const state = req.body.state;

  var saveUser = {
    username: req.body.username,
    password: encryptLib.encryptPassword(req.body.password),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city,
    state: req.body.state,
  };
  // console.log('new user:', saveUser);
  pool.query(`INSERT INTO users
    (username,
      password,
      first_name,
      last_name,
      city,
      state)
      VALUES
      ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
    [saveUser.username,
    saveUser.password,
    saveUser.first_name,
    saveUser.last_name,
    saveUser.city,
    saveUser.state],
    (err, result) => {
      if (err) {
        // console.log("Error inserting data: ", err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
});


module.exports = router;