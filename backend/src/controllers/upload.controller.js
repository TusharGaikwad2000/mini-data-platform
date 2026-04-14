const db = require("../config/db");
const { parseCSV } = require("../services/parser.service");

exports.uploadFile = async (req, res) => {
  try {
    let data;

    if (req.file.mimetype === "application/json") {
      data = JSON.parse(require("fs").readFileSync(req.file.path));
    } else {
      data = await parseCSV(req.file.path);
    }

    for (let row of data) {
      await db.query("INSERT INTO datasets(data) VALUES($1)", [row]);
    }

    res.json({ message: "Upload successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};