import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "./components/Upload";
import QueryBuilder from "./components/QueryBuilder";

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");

  const fetchDatasets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/datasets");
      setDatasets(res.data);
      // Auto-select first dataset if none selected
      if (!selectedDataset && res.data.length > 0) {
        setSelectedDataset(res.data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch datasets", err);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []); // Run once on mount

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/10 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 sm:px-12 lg:px-24 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              InsightEngine
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Your premium dynamic data ingestion and transformation platform. 
            Upload, query, and unlock insights instantly.
          </p>
        </div>
        
        <div className="w-full flex flex-col xl:flex-row gap-8 items-start">
          <div className="w-full xl:w-[420px] flex-shrink-0 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <Upload onUploadSuccess={(newId) => {
               fetchDatasets();
               setSelectedDataset(newId);
            }} />
          </div>
          
          <div className="w-full xl:flex-grow animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <QueryBuilder 
              datasets={datasets} 
              selectedDataset={selectedDataset}
              setSelectedDataset={setSelectedDataset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}