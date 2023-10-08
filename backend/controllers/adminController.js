const User = require("../models/userModel");
const BlogSetting = require("../models/blogSettingModel");
const Bcrypt = require("bcrypt");

const securePassword = async (password) => {
  try {
    const hashedPassword = await Bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};






const BlogSetup = async (req, res) => {
  try {
    const blogsetting = await BlogSetting.find({});
    if (blogsetting.length > 0) {
      res.redirect("/login");
    } else {
      res.render("blogsetup");
    }
  } catch (error) {
    console.error(error);
  }
};

const BlogSetupPost = async (req, res) => {
  try {
    const { blog_title, description, name, email, password } = req.body;
    const blog_logo = req.file.filename;

    const hashedPassword = await securePassword(password);

    const blogsetting = new BlogSetting({
      blog_title,
      blog_logo,
      description,
    });
    await blogsetting.save();

    const userdata = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: 1,
    });
    const user = await userdata.save();

    if (user) {
      res.redirect("/login");
    } else {
      res.render("blogsetup", { message: "Blog Not setup Properly" });
    }
  } catch (error) {
    console.error(error);
  }
};








const LoadDashboard = async (req, res) => {
  try {
    res.render("dashboard.ejs");
  } catch (error) {
    console.error(error);
  }
};


const LoadBlogs = async (req, res) => {
  try {
    res.render("blogs.ejs");
  } catch (error) {
    console.error(error);
  }
};


const LoadBilling = async (req, res) => {
  try {
    res.render("billing.ejs");
  } catch (error) {
    console.error(error);
  }
};


const LoadProfile = async (req, res) => {
  try {
    res.render("profile.ejs");
  } catch (error) {
    console.error(error);
  }
};



const LoadPostDashboard = async (req, res) => {
  try {
    res.render("postDashboard.ejs");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { BlogSetup, BlogSetupPost, LoadDashboard, LoadPostDashboard ,LoadBlogs ,LoadBilling ,LoadProfile };
