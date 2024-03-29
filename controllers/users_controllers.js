const userModel = require("../models/user");
const postModel = require("../models/post");

//to check first if user has logged in using cookies then display his profle
module.exports.profile = function (req, res) {
  console.log("in profile");
  postModel
    .find({}) //fetching all the records
    .populate("user") //this is the column name/key name in the schema of posts and we are populating this key of every post with the details of that user who posted it and this functionality has been defined in the schema of posts
    .populate("comments")
    .exec(function (err, posts) {
      if (err) {
        return res.redirect("back");
      }
      return res.render("user_profile", {
        email: req.user.email,
        name: req.user.name,
        posts: posts, //this is the populated collection of posts
        loginUser: req.session.passport.user,
      });
    });
};

//display sign up page
module.exports.signup = function (req, res) {
  //return res.sendFile('./views/signup.html',{root:'.'});
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  console.log("inside get sign-up");
  return res.render("user-sign-up");
};

//to display sign in page to user
module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  console.log("inside get signin");
  return res.render("user-sign-in");
};

//cater to the post request to create a new user if not exist earlier
module.exports.create = function (req, res) {
  let pwd = req.body.password;
  let cnfrmpwd = req.body.confirm_password;
  if (pwd === cnfrmpwd) {
    //check if user already present
    userModel.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        console.log("error in signing up the user");
        return res.send("error in signing up the user");
      } else {
        if (user) {
          return res.redirect("/users/signin");
        } else {
          //singup the user
          userModel.create(req.body, function (err, user) {
            if (err) {
              console.log("error in signing in the user");
              return res.send("Error in signing in the user");
            }
            return res.redirect("/users/signin");
          });
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

module.exports.createSession = function (req, res) {
  console.log(req.isAuthenticated());
  return res.redirect("/users/profile");
};

//clearing cookies and sending user back to home page
module.exports.signout = function (req, res) {
  console.log(req.cookies);
  res.clearCookie("codeial");
  if (req.cookies.codeial) {
    console.log("inside logout");
    req.logout();
    return res.redirect("/");
  } else {
    res.redirect("/");
  }
};
