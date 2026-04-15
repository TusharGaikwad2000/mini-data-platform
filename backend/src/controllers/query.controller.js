const { sequelize } = require("../../models");
const { buildQuery } = require("../services/query.service");

exports.runQuery = async (req, res) => {
  try {
    const { datasetId } = req.body;
    if (!datasetId) return res.status(400).json({ error: "datasetId is required" });

    const { query, values } = buildQuery(req.body);
    const [results] = await sequelize.query(query, { bind: values });
    res.json(results);
  } catch (err) {
    console.error("Query Error:", err);
    res.status(400).json({ error: err.message });
  }
};