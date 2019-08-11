// This creates a new Express server.
const express = require("express");
const app = express();

// Tells the server which potrt to run on.
const port = process.env.PORT || 5000;

// Sets up a basic route so that we can render some information on our page.
app.get("/", (req, res) => res.send("Sistine Camels"));

// Tells Express to start a socket and listen for connections on the path.
app.listen(port, () => console.log(`Server is running on port ${port}`));
