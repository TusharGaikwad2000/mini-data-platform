const { Dataset } = require('../../models');

exports.getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(datasets);
  } catch (err) {
    console.error("Error fetching datasets:", err);
    res.status(500).json({ error: "Failed to fetch datasets" });
  }
};
