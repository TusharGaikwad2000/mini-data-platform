import React, { useState } from "react";
import axios from "axios";

export default function QueryBuilder() {
  const [result, setResult] = useState([]);

  const runQuery = async () => {
    const res = await axios.post("http://localhost:5000/api/query", {
      filters: { channel: "Instagram" },
      groupBy: "channel",
      aggregation: { field: "revenue", type: "sum" }
    });
    setResult(res.data);
  };

  return (
    <div>
      <button onClick={runQuery}>Run Query</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}