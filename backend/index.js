require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const User = require("./models/User.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const bcryptSalt = bcrypt.genSaltSync(10);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
    res.json("Endpoint working fine!");
});

app.post('/register', async (req,res) => {
    const {name,email,password} = req.body;
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
    // res.json({name, });
});

app.post('/login', async (req,res) => {
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, process.env.JWT_SECRET, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json(userDoc);
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
})

app.listen(8080, () => {
    console.log("Server is up!");
});