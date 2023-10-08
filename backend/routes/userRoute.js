const ejs = require("ejs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("../config/config");
const {
  loadLogin,
  LoadRegister,
  VerifyLogin,
  ApplyLogout,
} = require("../controllers/userController");
const { isLogout, isLogin } = require("../middlewares/adminLoginAuth");

const user_route = express();

user_route.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

user_route.use(express.static("public"));

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// Set Engine
user_route.set("view engine", "ejs");
user_route.set("views", path.join(__dirname, "../../", "frontend", "pages"));

user_route.get("/login", isLogout, loadLogin);
user_route.post("/login", VerifyLogin);

user_route.get("/register",isLogout, LoadRegister);

user_route.get("/logout",isLogin, ApplyLogout);

module.exports = user_route;
