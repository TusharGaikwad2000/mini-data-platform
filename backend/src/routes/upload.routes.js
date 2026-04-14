const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("../controllers/upload.controller");

const router = express.Router();
router.post("/", upload.single("file"), uploadFile);

module.exports = router;