const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());

app.post("/verify-password", (req, res) => {
  const {password} = req.body;
  const pas = "$2a$10$lIhFTzE8jEZtlbE2UMhFGuhwmUmE5p/DgumW/VOkUGk87RbokS3Di";

  bcrypt.compare(password, pas, (err, result) => {
    if (err) {
      return res.status(500).json({message: "An error occurred."});
    }
    if (result) {
      res.json({success: true, message: "Password is correct."});
    } else {
      res.json({success: false, message: "Password is incorrect."});
    }
  });
});

exports.app = functions.https.onRequest(app);
