import { toast } from "react-hot-toast";
import api from "../../API";
import FileUploader from "./FileUploader";
import { useState } from "react";

function Pneumonia() {
  const [selectedFile, setSelectedFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("picture", selectedFile);
    console.log(formData.get("picture"));
    const response = await api.post("/pneumonia/analyze", { picture: formData });
    console.log(response);
    if (!response?.ok) toast.error("Something went wrong");
  };
  return (
    <div className=" h-screen flex flex-row">
      <div className="bg-[#D9D9D9] w-2/3 h-1/4 rounded-md ml-10 mt-10 flex flex-col justify-between items-center">
        <h1 className="ml-2 mt-2 font-bold w-full">Analyze</h1>
        <FileUploader setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
        {selectedFile && (
          <button className="bg-[#4c4b4b] text-white rounded-lg justify-center items-center" onClick={() => upload()}>
            <p className="ml-2 mr-2">Analyze</p>
          </button>
        )}
        <div />
      </div>
    </div>
  );
}

export default Pneumonia;
