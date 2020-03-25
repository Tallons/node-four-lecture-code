require("dotenv").config();
const express = require("express"),
      massive = require("massive"),
      session = require("express-session"),
      authCtrl = require("./controller/authController"),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();

  app.use(express.json());

//express-session is used in TLM(top-level middleware). It gets invoked and passed an object. This object contains settings for the session. Resave determines whether the session should save if an existing session hasn't had any changes to it, saveUninitialized determines whether a new session should save even if nothing has been added to it, secret is extra security for a users cookie, and the cookie property allows you to change settings for the user cookie, such as how long the cookie should exist (maxAge).
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60}
  }))

  massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
  }).then(db => {
    app.set('db', db);
    console.log("(DB) IT'S ALIVE!!")
  })

app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.get("/api/logout", authCtrl.logout);


app.listen(port, () => console.log("Server running on Port: " + port));