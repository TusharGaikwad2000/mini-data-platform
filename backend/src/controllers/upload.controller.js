const { parseCSV } = require("../services/parser.service");
const { Dataset, Record } = require("../../models");

exports.uploadFile = async (req, res) => {
  try {
    let data;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (req.file.mimetype === "application/json") {
      data = JSON.parse(require("fs").readFileSync(req.file.path));
    } else {
      data = await parseCSV(req.file.path);
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    // Use a transaction so if anything fails, we don't end up with an empty Dataset in the database!
    const sequelize = require('../../config/db');
    const result = await sequelize.transaction(async (t) => {
      // 1. Create the Dataset entry
      const dataset = await Dataset.create({
        name: req.file.originalname,
        file_type: req.file.mimetype === "application/json" ? "json" : "csv"
      }, { transaction: t });

      // 2. Prepare the Records attached to this dataset
      const records = data.map(row => ({
        dataset_id: dataset.id,
        data: row
      }));

      // 3. Bulk insert the records
      await Record.bulkCreate(records, { transaction: t });
      return dataset;
    });

    res.json({ message: "Upload successful", datasetId: result.id });
  } catch (err) {
    console.error("====== UPLOAD ERROR ======");
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};