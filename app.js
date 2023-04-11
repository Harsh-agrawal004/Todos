const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const db = require('./models')
require('./config/passport');
const { seedData } = require('./seeders/seedDB')
require('dotenv').config({});


// assets middleware
app.use(express.static(__dirname + "/assets"));

// request body parser middleware
app.use(
    express.urlencoded({
        extended: true
    })
);

//Enable session support
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUnintialized: false
}));

//Initiaze passport
app.use(passport.initialize());
app.use(passport.session())

//templating engine
app.set("views", `${__dirname}/views`);
console.log(__dirname);
app.set("view engine", "ejs");


//routes
require("./routes/r-index")(app);



app.get("/",(req,res)=>{
    return res.render("login");
})

db.sequelize.authenticate()
    .then(()=>{
        console.log("database connected")
    })
    .catch((e)=>{
        console.error("unable to connect",e);
    })

    db.sequelize.sync()
      .then(()=>{
        seedData()
      })
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.error(`App is Running at http://localhost:${PORT}`);
});

