import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";

const app = express();
const PORT = 5300;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);

// Codesanbox does not need PORT :)
app.listen(PORT, () => console.log(`PORT 5300 Listening!`));
