/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";
import bcrypt from "bcrypt";

// Add your magic here!

export const home = (req, res) => {
  const isLoggedIn = req.session.loggedIn;
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return res.redirect("/login");
  }
  return res.render("home", { pageTitle: "Home" });
};

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { name, username, password, password2 },
  } = req;
  const pageTitle = "Join";
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "Username already taken!" });
  }

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation error",
    });
  }

  try {
    await User.create({
      name,
      username,
      password,
    });
    res.redirect("login");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: error._message });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "There is no account registerd by this username",
    });
  }

  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "Wrong Password" });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
};
