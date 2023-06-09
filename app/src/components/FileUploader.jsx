import { useState } from "react";
import { AiFillFileImage } from "react-icons/ai";

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
      className={`flex flex-col items-center justify-center border-4 border-dashed rounded-lg ${isDragging ? "border-blue-500" : "border-gray-300"}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}>
      <label htmlFor="fileInput" className="cursor-pointer p-4">
        <input type="file" id="fileInput" accept="image/*" className="hidden" onChange={handleFileSelect} />
        {selectedFile ? (
          <div className="flex flex-row items-center">
            <div>
              <p>Selected file:</p>
              <p>{selectedFile.name}</p>
            </div>

            <img src={URL.createObjectURL(selectedFile)} alt="preview" className="h-20" />
          </div>
        ) : (
          <div className="text-gray-500 flex items-center gap-5">
            <AiFillFileImage size={35} className="text-gray-800" />
            <p className="">Drag and drop a file here or click to upload</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader;
