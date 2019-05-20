const passport = require("passport");

exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log("not logged in");
  res.redirect("/login");
};

exports.Login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
});

exports.Logout = function(req, res, next) {
  req.logout();
  res.redirect("/");
}