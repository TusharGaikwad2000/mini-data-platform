import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QueryBuilder({ datasets, selectedDataset, setSelectedDataset }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dynamic Query State
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [aggType, setAggType] = useState("");
  const [aggField, setAggField] = useState("");

  const runQuery = async () => {
    if (!selectedDataset) {
      setError("Please select a dataset to query against first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const payload = { datasetId: selectedDataset };

    if (filterKey && filterValue) {
      payload.filters = { [filterKey]: filterValue };
    }
    if (groupBy) {
      payload.groupBy = groupBy;
    }
    if (aggType) {
      payload.aggregation = { type: aggType, field: aggField };
    }

    try {
      const res = await axios.post("http://localhost:5000/api/query", payload);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Query failed");
    } finally {
      setLoading(false);
    }
  };

  const clearQuery = () => {
    setFilterKey("");
    setFilterValue("");
    setGroupBy("");
    setAggType("");
    setAggField("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:border-white/20 transition-all duration-300 animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.2s]">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">Dynamic Insights Engine</h2>

      {(!datasets || datasets.length === 0) ? (
        <div className="text-slate-400 italic">
          No datasets found. Upload one above!
        </div>
      ) : (
        <>
          {/* Target Dataset Selection */}
          <div className="mb-6">
            <label className="block mb-2 text-slate-400 text-sm">Target Dataset</label>
            <select 
              className="w-full bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 [&_option]:bg-slate-900" 
              value={selectedDataset || ""} 
              onChange={(e) => setSelectedDataset(e.target.value)}
            >
              <option value="" disabled>Select a dataset...</option>
              {datasets.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.file_type.toUpperCase()}) - ID: {d.id}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mb-8">
            
            {/* Filter Module */}
            <div className="bg-white/5 backdrop-blur-md border border-violet-500/40 rounded-2xl p-4 transition-all duration-300">
              <h3 className="text-base mb-2 font-medium">Filter (Optional)</h3>
              <input 
                placeholder="Field (e.g. channel)" 
                className="mb-2 w-full bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" 
                value={filterKey}
                onChange={e => setFilterKey(e.target.value)}
              />
              <input 
                placeholder="Value (e.g. Instagram)" 
                className="w-full bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" 
                value={filterValue}
                onChange={e => setFilterValue(e.target.value)}
              />
            </div>

            {/* Group By Module */}
            <div className="bg-white/5 backdrop-blur-md border border-violet-500/40 rounded-2xl p-4 transition-all duration-300">
              <h3 className="text-base mb-2 font-medium">Grouping (Optional)</h3>
              <input 
                placeholder="Group By Field (e.g. channel)" 
                className="w-full bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" 
                value={groupBy}
                onChange={e => setGroupBy(e.target.value)}
              />
            </div>

            {/* Aggregation Module */}
            <div className="bg-white/5 backdrop-blur-md border border-violet-500/40 rounded-2xl p-4 transition-all duration-300">
              <h3 className="text-base mb-2 font-medium">Aggregation</h3>
              <select 
                className="mb-2 w-full bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 [&_option]:bg-slate-900" 
                value={aggType}
                onChange={e => setAggType(e.target.value)}
              >
                <option value="">Count records (Default)</option>
                <option value="sum">Sum</option>
                <option value="avg">Average</option>
              </select>
              {aggType && aggType !== 'count' && (
                <input 
                  placeholder="Field to aggregate (e.g. revenue)" 
                  className="w-full bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" 
                  value={aggField}
                  onChange={e => setAggField(e.target.value)}
                />
              )}
            </div>
            
          </div>

          <div className="flex gap-4 mb-6">
            <button className="bg-violet-500 text-white border-0 px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(139,92,246,0.2)] hover:bg-violet-600 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" onClick={runQuery} disabled={loading || !selectedDataset}>
              {loading ? "Executing..." : "Run Query"}
            </button>
            <button className="bg-transparent border border-white/10 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:border-white/20 hover:bg-white/5" onClick={clearQuery}>
              Clear Limits
            </button>
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Results Table View */}
          {result && (
            <div className="mt-6">
              <h3 className="mb-4 font-medium text-lg">Query Results ({result?.length || 0} rows)</h3>
              
              {(!Array.isArray(result) || result.length === 0) ? (
                <div className="p-8 text-center bg-white/5 rounded-lg">
                  No matching records found.
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-black/40 border-b border-white/10">
                      <tr>
                        {Object.keys(result[0]).map(k => (
                          <th key={k} className="py-3 px-4 text-slate-400 font-semibold">{k.toUpperCase()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.map((row, i) => (
                        <tr key={i} className={`${i !== result.length - 1 ? 'border-b border-white/10' : ''} ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/5'}`}>
                          {Object.values(row).map((val, vi) => (
                            <td key={vi} className="py-3 px-4 font-mono text-sm">
                              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </>
      )}
    </div>
  );
}