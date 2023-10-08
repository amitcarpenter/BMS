const BlogSetting = require("../models/blogSettingModel");

const isBlog = async (req, res, next) => {
  try {
    const blogSetting = await BlogSetting.find();
    if (blogSetting.length == 0 && req.originalUrl != "/blog-setup") {
      res.redirect("/blog-setup");
    } else {
      next();
    }
  } catch (error) {
    console.log(error + "Error in IS Blog Amit");
  }
};

module.exports = { isBlog };
