import express from "express";
import { getJoin, postJoin, getLogin, postLogin, home } from "./userController";

const userRouter = express.Router();

// Add your magic here!
userRouter.get("/", home);
userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.get("/logout", (req, res) => res.send("See you!"));

export default userRouter;
