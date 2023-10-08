const ejs = require("ejs");
const path = require("path");
const multer = require("multer");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

require("../config/config");

const {
  BlogSetup,
  BlogSetupPost,
  LoadDashboard,
  LoadPostDashboard,
  LoadProfile,
  LoadBilling,
  LoadBlogs,
} = require("../controllers/adminController");
const { isLogin } = require("../middlewares/adminLoginAuth");

const admin_route = express();

admin_route.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Set Engine
admin_route.set("view engine", "ejs");
admin_route.set("views", path.join(__dirname, "../../", "frontend", "pages"));

admin_route.use(express.static("public"));

admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    cb(null, uniqueFilename); // Pass the unique filename to cb
  },
});

const upload = multer({ storage: storage });

admin_route.get("/blog-setup", BlogSetup);
admin_route.post("/blog-setup", upload.single("blog_logo"), BlogSetupPost);

admin_route.get("/dashboard", isLogin, LoadDashboard);

admin_route.get("/create-post", isLogin, LoadPostDashboard);

admin_route.get("/profile", isLogin, LoadProfile);

admin_route.get("/billing", isLogin, LoadBilling);

admin_route.get("/Blogs", isLogin, LoadBlogs);

module.exports = admin_route;
