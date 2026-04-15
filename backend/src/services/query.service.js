exports.buildQuery = ({ datasetId, filters, groupBy, aggregation }) => {
  let whereStr = "dataset_id = $1";
  let values = [datasetId];
  let index = 2;

  if (filters) {
    Object.keys(filters).forEach((key) => {
      // Allow dynamic fields properly
      whereStr += ` AND data->>'${key}' = $${index}`;
      values.push(filters[key]);
      index++;
    });
  }

  let agg = "COUNT(*)";
  if (aggregation) {
    if (aggregation.type === "sum") {
      agg = `SUM((data->>'${aggregation.field}')::numeric)`;
    }
    if (aggregation.type === "avg") {
      agg = `AVG((data->>'${aggregation.field}')::numeric)`;
    }
  }

  let query = `SELECT ${groupBy ? `data->>'${groupBy}' AS "group",` : ""} ${agg} AS "value" FROM records WHERE ${whereStr}`;

  if (groupBy) query += ` GROUP BY data->>'${groupBy}'`;

  return { query, values };
};