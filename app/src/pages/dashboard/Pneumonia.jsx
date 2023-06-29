import { toast } from "react-hot-toast";
import api from "../../API";
import FileUploader from "../../components/FileUploader";
import { useState } from "react";

function Pneumonia() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const upload = async () => {
    setLoading(true);
    const image = await readFileAsync(selectedFile);
    const response = await api.post("/pneumonia/analyze", { image });
    setLoading(false);
    if (!response?.ok) return toast.error(response.error || "Error while analyzing image");
    setResult(response.data);
  };

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="flex flex-row">
      <div className="bg-[#D9D9D9] w-2/3 rounded-md ml-10 mt-10 flex flex-col justify-between items-center p-5">
        <h1 className="ml-2 mt-2 font-bold w-full">Analyze</h1>
        <FileUploader setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
        {selectedFile && (
          <button className="bg-[#4c4b4b] text-white rounded-lg justify-center items-center" onClick={() => upload()}>
            <p className="ml-2 mr-2">Analyze</p>
          </button>
        )}
        {loading ? <p className="text-[#4c4b4b]">Loading...</p> : result ? <p className="text-[#4c4b4b]">Result: {result}</p> : <div />}
      </div>
    </div>
  );
}

export default Pneumonia;
