import { useState } from "react";

const FileUploader = ({ selectedFile, setSelectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center p-4 border-4 border-dashed rounded-lg ${isDragging ? "border-blue-500" : "border-gray-300"}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}>
      <label htmlFor="fileInput" className="cursor-pointer">
        <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileSelect} />
        {selectedFile ? (
          <div>
            <p>Selected file:</p>
            <p>{selectedFile.name}</p>
          </div>
        ) : (
          <div className="text-gray-500 flex items-center">
            <span className="text-3xl">📁</span>
            <p className="mt-2">Drag and drop a file here or click to upload</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader;
