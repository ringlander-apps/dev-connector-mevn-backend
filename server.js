//Bring in Express
const express = require("express");

//Setup express
const app = express();
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
