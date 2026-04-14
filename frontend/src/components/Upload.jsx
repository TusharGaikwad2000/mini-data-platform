import React, { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post("http://localhost:5000/api/upload", formData);
    alert("Uploaded");
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}