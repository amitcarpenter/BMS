const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_id && req.session.is_Admin == 1) {
    } else {
      return res.redirect("/login");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (req.session.user_id && req.session.is_Admin == 1) {
      return res.redirect("/dashboard");
    } else {
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isLogin, isLogout };
