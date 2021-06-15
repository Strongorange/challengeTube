import express from "express";
import { homePage, getRead, postRead } from "../controllers/rootController";
import { uploadText } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", homePage);
rootRouter
  .route("/read")
  .get(getRead)
  .post(uploadText.single("html"), postRead);

export default rootRouter;
