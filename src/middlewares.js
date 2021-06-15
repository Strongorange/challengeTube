import multer from "multer";

export const uploadText = multer({ dest: "uploads/" });
