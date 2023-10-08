const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  blog_image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
