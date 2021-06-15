import fs from "fs";

export const homePage = (req, res) => {
  return res.render("home");
};

export const getRead = (req, res) => {
  res.send("read");
};

export const postRead = (req, res) => {
  const {
    file: { filename },
  } = req;
  console.log(req.file);
  fs.readFile(`uploads/${filename}`, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(typeof data);
    return res.render("content", { data });
  });
};
