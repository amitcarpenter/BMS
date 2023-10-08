const User = require("../models/userModel");
const Bcrypt = require("bcrypt");

const loadLogin = async (req, res) => {
  try {
    res.render("sign-in.ejs");
  } catch (error) {
    console.error(error);
  }
};

const VerifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.render("sign-in.ejs", { message: "User Not Found" });
    }
    if (user) {
      const passwordCompare = await Bcrypt.compare(password, user.password);
      if (passwordCompare) {
        req.session.user_id = user._id;
        req.session.is_Admin = user.isAdmin;
        if (user.isAdmin == 1) {
          return res.redirect("/dashboard");
        } else {
          return res.redirect("/userDashboard");
        }
      } else {
        res.render("sign-in.ejs", {
          message: "User Detail Is Not Curenct",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const LoadRegister = async (req, res) => {
  try {
    res.render("sign-up.ejs");
  } catch (error) {
    console.error(error);
  }
};

const ApplyLogout = async (req, res) => {
  try {
    req.session.destroy();
    return res.redirect("/login");
  } catch (error) {
    consol;
  }
};

module.exports = { loadLogin, VerifyLogin, LoadRegister, ApplyLogout };
