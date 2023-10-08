const express = require("express");
const cors = require("cors")
const ejs = require("ejs");
const path = require("path");
const admin_route = require("./routes/adminRoute");
const { isBlog } = require("./middlewares/isBlog");
const user_route = require("./routes/userRoute");
require("./config/databaseConnect");
require("./config/config");

const app = express();

// Set Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/pages"));

app.use(cors())
app.use(isBlog);

app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));
app.use('/pages', express.static(path.join(__dirname, '../frontend/pages')));
app.use('/dist', express.static(path.join(__dirname, '../frontend/dist')));
app.use('/docs', express.static(path.join(__dirname, '../frontend/docs')));
app.use('/plugins', express.static(path.join(__dirname, '../frontend/plugins')));

app.use(admin_route);
app.use(user_route);


app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is Working on ${PORT} `);
});
