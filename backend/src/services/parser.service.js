const csv = require("csv-parser");
const fs = require("fs");

exports.parseCSV = (filePath) => {
  return new Promise((resolve) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
};