const User = require("../models/userModel");
const Post = require("../models/postModel");
const BlogSetting = require("../models/blogSettingModel");
const Bcrypt = require("bcrypt");


// Function for Secure password
const securePassword = async (password) => {
  try {
    const hashedPassword = await Bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};





// Load Blog Setup Page 
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

// Blog setup Here
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

// Load Dashboard
const LoadDashboard = async (req, res) => {
  try {
    res.render("dashboard.ejs");
  } catch (error) {
    console.error(error);
  }
};


// Load Billing
const LoadBilling = async (req, res) => {
  try {
    res.render("billing.ejs");
  } catch (error) {
    console.error(error);
  }
};



// Load Profile 
const LoadProfile = async (req, res) => {
  try {
    res.render("profile.ejs");
  } catch (error) {
    console.error(error);
  }
};



// Load Post Dashboard
const LoadPostDashboard = async (req, res) => {
  try {
    res.render("postDashboard.ejs");
  } catch (error) {
    console.error(error);
  }
};

const AddPost = async (req, res) => {
  try {

    const { title, content, subtitle, category } = req.body
    const blog_image = req.file.filename

    const post = new Post({
      title,
      content,
      subtitle,
      category,
      blog_image
    })

    const postData = await post.save()

    res.render("postDashboard.ejs", { message: "Post Added SuccessFully" })



  } catch (error) {
    console.log(error)

  }
}

//


// load Blogs
const LoadBlogs = async (req, res) => {
  try {
    const data = await Post.find()
    res.render("blogs.ejs", { data });
  } catch (error) {
    console.error(error);
  }
};




module.exports = { BlogSetup, BlogSetupPost, LoadDashboard, LoadPostDashboard, LoadBlogs, LoadBilling, LoadProfile, AddPost };
