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
    <div className="max-w-[1200px] mx-auto py-12 px-6">
      <h1 className="bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent inline-block mb-8 text-4xl sm:text-5xl font-semibold tracking-tight animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]">InsightEngine™</h1>
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8 items-start">
        <div className="flex-[1_1_350px]">
          <Upload onUploadSuccess={(newId) => {
             fetchDatasets();
             setSelectedDataset(newId);
          }} />
        </div>
        
        <div className="flex-[2_1_600px]">
          <QueryBuilder 
            datasets={datasets} 
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        </div>
      </div>
    </div>
  );
}