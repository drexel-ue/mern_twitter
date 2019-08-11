// Used to sign source of truth tokens for session and protected routes.
const jwt = require("jsonwebtoken");
// Provides access to secret.
const keys = require("../../config/keys");
// Needed to create the router.
const express = require("express");
// Handles directing requests to the desired handlers.
const router = express.Router();
// Used to encrypt passwords.
const bcrypt = require("bcryptjs");
// User model.
const User = require("../../models/User");
// For validating tokens.
const passport = require("passport");

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
        // Throw an error if there is one.
        if (error) throw error;
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

// Handles logging in.
router.post("/login", (req, res) => {
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
        const payload = { id: user.id, email: user.email, handle: user.handle };

        jwt.sign(
          payload,
          keys.secretOrKey,
          // Tell the key to expire in one hour
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// Serves current user.
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) =>
    res.json(
      res.json({
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email
      })
    )
);

module.exports = router;
