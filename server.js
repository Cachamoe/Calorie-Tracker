let express = require("express");
let PORT = process.env.PORT || 8080;
let app = express();
let db = require("./models")

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let routes =
require("./Routes/html-routes.js")(app);
require("./Routes/api-routes.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});


