const express = require("express");
const { UserModel } = require("../models/user.model");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

UserRouter.post("/register", async (req, res) => {
  const { email, password, avatar, username } = req.body;
  let findit = await UserModel.findOne({ email });
  if (findit) {
    res.send({ msg: "user already exists" });
  } else {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        let newuser = new UserModel({
          email,
          password: hash,
          avatar,
          username,
        });
        await newuser.save();
        res.send({ msg: "user registed successfully" });
      } else {
        res.send(err.message);
      }
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let findit = await UserModel.findOne({ email });

  if (!findit) {
    console.log(findit)
    res.send({ msg: "please register first" });
  } else {
    bcrypt.compare(password, findit.password, async (err, hashed) => {
      if (hashed) {
        jwt.sign(
          {
            username: findit.username,
            UserId: findit._id,
            avatar: findit.avatar,
          },
          "ok",
          async (err, token) => {
            if (token) {
              res.send({ msg: "user Login successfully", token });
            } else {
              res.send(err.message);
            }
          }
        );
      } else {
        res.send({ msg: "password is incorrect" });
      }
    });
  }
});

module.exports = {
  UserRouter,
};
