//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const {Blockchain , Transaction} = require("../server/blockchain")
const blockchain = new Blockchain();


const User = require("../server/models/User");

const session = require("express-session");

const UserRoutes = require("../server/routers/User");
const LandRoutes = require("../server/routers/Land");

const Land = require("../server/models/Land");
const bcrypt = require("bcrypt")
const saltRounds = 10;

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.static("public"));
app.set('view engine' , 'ejs');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use(session({
    secret: "MyNameIsOriya",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



mongoose.connect("mongodb+srv://OriyaHajbi:Oriya123@cluster0.yjydbsq.mongodb.net/Metacentraland" , {useNewUrlParser: true} );
// mongoose.connect("mongodb://localhost:27017/Metacentraland" , {useNewUrlParser: true} ); //local
const db = mongoose.connection;
db.on("error" , (error) => console.log(error));
db.once("open" , () => {
  console.log("Connect to DB");
  User.find({} , async function(err , foundUser){
    if(foundUser.length === 0){

        bcrypt.hash("manager" , saltRounds , function(err , hash){
          const manager = new User({
              username: "O&N.Ltd",
              password: hash,
              balance: 0
          });

          manager.save();

        }
      )
    }
  })
  Land.find({} , async function(err , foundLand){
    if (foundLand.length === 0){
      var size =50;
      for (var i=0; i< size ; i++){
        for(var j=0 ; j<size ; j++){
          const type = ((i>20 && i<30 && j>20 && j<30) || //big park
          (i>5 && i<10 && j>5 && j<10) || //up and left small park
          (i>39 && i<44 && j>5 && j<10) || //up and right small park
          (i>5 && i<10 && j>39 && j<44)|| //down and left small park
          (i>39 && i<44 && j>39 && j<44) /*down and right small park*/) ? "park" : (
            (i>9 && i<40 && j>6 && j<9) || // up road
           (i>9 && i<40 && j>40 && j<43) || // down road
           (i>6 && i<9 && j>9 && j<40) || // left road
           (i>40 && i<43 && j>9 && j<40) || // right road 
           (i == 25 && ( (j>8 && j<21) || (j>29 && j<41))) || //road up to down park
           (j == 25 && ( (i>8 && i<21) || (i>29 && i<41)))) ? "road" : "NFT";

          const cost = Math.floor(Math.random()*185)+15;

          blockchain.addBlock();
          const land = new Land({
            ownerId: "O&N.Ltd",
            rowIndex: i,
            colIndex: j,
            type: type,
            cost: cost,
            game: "",
            isForSale: type==="NFT",
            block: blockchain.getLatesBlock()
          })
          await land.save();
       }
      }
    }
  })

});

app.use("/users" ,UserRoutes);
app.use("/lands" ,LandRoutes);


app.get("/" ,function(req, res){
    
});

app.get("/auth/google" , 
    passport.authenticate("google" , {scope: ["profile"]})
);


app.get("/register" ,function(req, res){
    
});

app.get("/main" ,function(req, res){
    console.log("in get main ");
    
});

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
        return next(err); 
    }
    res.redirect('/');
  });
});


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


let port = process.env.Port;
if (port == null || port == ""){
  port = 4000;
}

app.listen(port , function(){
    console.log("Server has started on port ${port}");
})