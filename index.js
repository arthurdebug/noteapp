/**********************************************
 * Notetaking Application Challenge
 * ==================================
 ***********************************************/

/** # Import all libraries  #
/*  ====================== */
// 1) Import all required modules

// In-built Node Modules (filesystem and path)
const fs = require("fs");
const path = require("path");

// NPM installed modules
// Set up your application, import the required packages
// Capitalize when it is a class

/** # Configure Express #
/*  ====================== */
// 2) Configure Express
// Set up handlebars (set up engine and register handlebars with express)
// Look at the example from the lecture: https://xccelerate.talentlms.com/unit/view/id:2002
const express = require("express");
const app = express();
//add dotenv for loading db
require("dotenv").config();
const config= require("./config.json")["development"]
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);

// Set up Express
const bodyParser = require("body-parser");
// Set up any middleware required, like body-parser
const basicAuth = require("express-basic-auth");
const handlebars = require("express-handlebars");
const AuthChallenger = require("./AuthChallenger");
// Set up and configure express-basic-auth using the AuthChallenger


const config = require("./stores/config.json")["development"]; // We use all the development paths

//set up knex to connect database


app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
//I dont really get why this code work is important?
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  basicAuth({
    authorizer: AuthChallenger,
    authorizeAsync:true,
    challenge: true,
    realm: "Note Taking Application",
  })
);








/** # Set up NoteService  #
/*  ====================== */
// 3) Past in the file into the noteservice class
const NoteService = require("./Services/NoteService");
const noteService = new NoteService(knex);
const NoteRouter = require("./Routers/NoteRouter");
/** # Set up basic express server  #
/*  ====================== */
// 4) Set up basic express server
// Set up your route handler for '/' ==> send and index page to the users
  // Create a callback function
  // You always need a .then to

// DONT DO STEP FOUR UNTIL NEXT WEEK
/** # Set up authentication   #
/*  ====================== */
// 5) Set up authentication
// Set up basic auth
// DONT DO THE ABOVE PART UNTIL NEXT WEEK
/** # Set up routes from noteservice  #
/*  ====================== */
// 6) Create a new instance of noteService and pass the file path/to/the/file where you want the service to read from and write to.
const noteService = new NoteService(path.join(__dirname, config.notes), fs);
app.get("/", (req, res, next) => {
  console.log("Getting");
  next();
});
app.get("/", (req, res) => {
  console.log(req.auth.user, req.auth.password);
  noteService.list(req.auth.user).then((data) => {
    console.log(data);
    res.render("index", {
      user: req.auth.user,
      notes: data,
    });
  });
});
/** #  Set up Note Router  #
/*  ====================== */
// 7) Set up the NoteRouter - handle the requests and responses in the note, read from a file and return the actual data, get the note from your JSON file and return to the clients browser.
// any notes that go to api/routes will go to noterouter
// /api/notes/:id
app.use("/api/info", new NoteRouter(noteService).router()); 
// make your application listen to a port of your choice.
app.listen(3000, () => {
  console.log("Listening on 3000");
});
module.exports = app;