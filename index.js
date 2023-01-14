const express = require("express");
const routes = require("./routes/index.js");
const app = express();
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session"); //express-session checks for the cookie corresponding to the sessionID stored in db
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const mongoStore = require("connect-mongo");

//it is used to syntatically put the ejs file into body tag of html page
const expressLayouts = require("express-ejs-layouts");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); //extended is used for parsing nested objects which by default is false
app.use(express.static("./assets"));
app.use(expressLayouts);

//it allows the usage of 'style' variable in layout ejs file so that whenver main ejs file is rendered, the css file it wanted gets put into layout file in place of 'style' variable name
app.set("layout extractStyles", true);

//it ensures the scripts are loaded at the end of the ejs file u are trying to load into the 'SCRIPT' variable
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    name: "codeial",
    secret: "blahsomething", //secret key used to generate hash of this session
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1,
    },
    originalMaxAge: 5 * 1000,
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://Ayush:WYL4JrYUrhcqsSM@cluster0.ts3ep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  console.log(req.session);
  next();
});
app.use("/", routes);
app.listen(port, function (err) {
  if (err) console.log(`Error in running the the Server: ${err}`);
  else {
    console.log(`Server is running at port: ${port}`);
  }
});
