import express from "express";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";

const PORT = 5300;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

// Codesanbox does not need PORT :)
app.listen(PORT, () => console.log(`PORT 5300 Listening!`));
