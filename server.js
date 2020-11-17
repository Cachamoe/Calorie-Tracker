// Require Express 
let express = require("express");

let PORT = process.env.PORT || 8080;

let app = express();

<<<<<<< HEAD
var db = require("./models")

const moment = require('moment');
let now = moment();

console.log("Day of week: " + now.weekday());

=======
>>>>>>> parent of de753b9... Merge branch 'main' into Caleb-Branch
// Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
let routes = require("./controllers/calorieController.js");
require("./Routes/html-routes.js")(app);
require("./Routes/api-routes.js")(app);

// Start our server so that it can begin listening to client requests
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
app.use(routes);


