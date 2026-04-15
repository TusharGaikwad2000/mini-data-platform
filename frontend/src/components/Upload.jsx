import React, { useState } from "react";
import axios from "axios";

export default function Upload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    // Validate format visually
    if (file.type !== "application/json" && file.type !== "text/csv") {
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.json')) {
        setError("Only CSV or JSON files are supported.");
        return;
      }
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      setFile(null);
      // Reset input element visually
      document.getElementById('file-upload').value = "";
      if (onUploadSuccess) onUploadSuccess(res.data.datasetId);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl hover:border-white/20 transition-all duration-300 animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:0.1s] mb-8">
      <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white">Dataset Ingestion</h2>
      <p className="text-slate-400 mb-6 text-sm leading-relaxed">
        Upload your structured or unstructured JSON / CSV files. Schemas are entirely dynamic.
      </p>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <div>
          <input 
            id="file-upload"
            type="file" 
            className="w-full bg-black/40 border border-white/10 text-slate-300 px-4 py-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30" 
            accept=".csv,.json"
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </div>
        <button 
          type="submit" 
          className="mt-2 w-full bg-violet-600 text-white border-0 px-6 py-3.5 rounded-xl font-medium cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:bg-violet-500 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(124,58,237,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
          disabled={loading || !file}
        >
          {loading ? "Processing..." : "Upload Dataset"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}