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
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Dataset Ingestion</h2>
      <p className="text-slate-400 mb-6 text-sm">
        Upload your structured or unstructured JSON / CSV files. Schemas are entirely dynamic.
      </p>

      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-4 items-center">
        <input 
          id="file-upload"
          type="file" 
          className="flex-grow w-full sm:w-auto bg-black/20 border border-white/10 text-slate-50 px-4 py-3 rounded-lg font-inherit transition-colors duration-200 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" 
          accept=".csv,.json"
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-violet-500 text-white border-0 px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 shadow-[0_4px_12px_rgba(139,92,246,0.2)] hover:bg-violet-600 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap" 
          disabled={loading || !file}
        >
          {loading ? "Processing..." : "Upload Dataset"}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-500 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}