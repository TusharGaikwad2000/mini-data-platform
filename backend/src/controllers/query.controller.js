const db = require("../config/db");
const { buildQuery } = require("../services/query.service");

exports.runQuery = async (req, res) => {
  try {
    const { query, values } = buildQuery(req.body);
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};