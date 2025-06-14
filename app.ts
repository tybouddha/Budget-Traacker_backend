require("dotenv").config();
import "./models/connection";

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

var app = express();

import cors from "cors";

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
