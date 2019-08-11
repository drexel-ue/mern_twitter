const mongoose = require("mongoose");
// This creates a new Express server.
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
// Imports created routes.
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
// Allows us to parse the json sent to the front end.
const bodyParser = require("body-parser");

// Sets up connection to MondoDB.
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Tells the server which potrt to run on.
const port = process.env.PORT || 5000;

// Sets up a basic route so that we can render some information on our page.
app.get("/", (req, res) => res.send("Sistine Camels"));

// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json.
app.use(bodyParser.json());

// We must tell Express to use imported routes.
app.use("/api/users", users);
app.use("/api/tweets", tweets);

// Tells Express to start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port ${port}`));
