import express from "express";
var router = express.Router();

import FunctionType from "../types/functionType";
import User from "../models/user";
import UserType from "../types/userType";
import checkBody from "../modules/checkbody";
import uid2 from "uid2";
import bcrypt from "bcrypt";

const getUser: FunctionType = (req, res, next) => {
  res.send("respond with a resource");
};

const postNewUser: FunctionType = async (req, res, next) => {
  const bodyFields = ["username", "email", "password"];
  //Check if all field are not empty
  if (!checkBody(req.body, bodyFields)) {
    return res.json({
      result: false,
      error: "Champs manquant ou mal renseigné",
    });
  }

  //Check if email is in a good style
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegExp.test(req.body.email)) {
    return res.json({ result: false, error: "Format d'email invalide." });
  }

  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.json({ result: false, error: "Utilisateur existe déjà!" });
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    });
    const savedUser = await newUser.save();
    return res.json({
      result: true,
      username: savedUser.username,
      email: savedUser.email,
      token: savedUser.token,
      message: "Compte enregistré avec succès",
    });
  } catch (err: any) {
    console.log(err.message);
    return res.json({ result: false, error: "Erreur interne du serveur." });
  }
};

//Get to list user
router.get("/", getUser);

//Post to create new user SIGNUP
router.post("/signup", postNewUser);

export default router;
