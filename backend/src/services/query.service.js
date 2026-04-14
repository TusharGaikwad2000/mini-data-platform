exports.buildQuery = ({ filters, groupBy, aggregation }) => {
  let where = "";
  let values = [];
  let index = 1;

  if (filters) {
    Object.keys(filters).forEach((key) => {
      where += `data->>'${key}' = $${index} AND `;
      values.push(filters[key]);
      index++;
    });
    where = where.slice(0, -4);
  }

  let agg = "COUNT(*)";

  if (aggregation) {
    if (aggregation.type === "sum") {
      agg = `SUM((data->>'${aggregation.field}')::numeric)`;
    }
    if (aggregation.type === "avg") {
      agg = `AVG((data->>'${aggregation.field}')::numeric)`;
    }
    if (aggregation.type === "count") {
      agg = `COUNT(*)`;
    }
  }

  let query = `SELECT ${groupBy ? `data->>'${groupBy}',` : ""} ${agg} FROM datasets`;

  if (where) query += ` WHERE ${where}`;
  if (groupBy) query += ` GROUP BY data->>'${groupBy}'`;

  return { query, values };
};