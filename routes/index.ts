var express = require("express");
var router = express.Router();
import FunctionType from "../types/functionType";

const homeHandler: FunctionType = (req, res, next) => {
  res.render("index", { title: "ça fonctionne" });
};

/* GET home page. */
router.get("/", homeHandler);

module.exports = router;
