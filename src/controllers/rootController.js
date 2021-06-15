import fs from "fs";

export const homePage = (req, res) => {
  let contentNumber;
  fs.readdir("uploads/", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    contentNumber = data.length;
    return res.render("home", { data, contentNumber });
  });
};

export const getRead = (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  fs.readFile(`uploads/${id}`, "utf8", (err, data) => {
    if (err) throw err;
    return res.render("content", { data });
  });
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
