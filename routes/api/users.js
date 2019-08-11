// Needed to create the router.
const express = require("express");
// Handles directing requests to the desired handlers.
const router = express.Router();
// Used to encrypt passwords.
const bcrypt = require("bcryptjs");
// User model.
const User = require("../../models/User");

// NB: The callback for every Express route requires a request and response as arguments.
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// Handles creation of new users.
router.post("/register", (req, res) => {
  const body = req.body;
  // First check to make sure this email is not already in use.
  User.findOne({ email: body.email }).then(user => {
    if (user) {
      // Throw a 400 user if the email is already in use.
      return res.status(400).json({ email: "This email is already in use." });
    } else {
      // Else, create a new user.
      const newUser = new User({
        handle: body.handle,
        email: body.email,
        password: body.password
      });

      // Salt the password.
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          // Throw an error if there is one.
          if (error) throw error;
          // Set the newUser object's password to the salted password (hash).
          newUser.password = hash;
          newUser
            // Save the new user document to the database.
            .save()
            // Return a json object representing the new user document as processed by the databse.
            .then(user => res.json(user))
            // Log any errors.
            .catch(error => console.log(error));
        });
      });
    }
  });
});

router.post("/router", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(404)
        .json({ email: `There is no user with the email: ${email}` });
    }

    bcrypt.compare(password, user.password).then(good => {
      if (good) {
        res.json(user);
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
