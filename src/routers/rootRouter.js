import express from "express";
import { homePage, getRead, postRead } from "../controllers/rootController";
import { uploadText } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", homePage);
rootRouter.route("/read").post(uploadText.single("html"), postRead);
rootRouter.get("/read/:id", getRead);

export default rootRouter;
