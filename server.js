//Bring in Express
const express = require("express");
const bodyParser = require("body-parser");
//Bring in routes
const auth = require("./routes/api/auth");

//Setup express
const app = express();

//Setup and USE body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/auth", auth);

//Port
const port = process.env.PORT || 5000;

//Create simple test route
app.get("/", (req, res) => {
  res.send("Hello from Express");
});
//Start up the server and wait for incoming requests....
app.listen(port, () =>
  console.log(
    `Server is up and running, listening for requests on port: ${port}`
  )
);
