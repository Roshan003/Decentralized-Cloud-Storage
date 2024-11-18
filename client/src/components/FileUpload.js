import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // Upload the file to Pinata
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Replace with your API Key`,
            pinata_secret_api_key: `Replace with your API Secret Key`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        // Add the image hash to your smart contract
        await contract.add(account, ImgHash);

        alert("File Successfully Uploaded");

        // Reset the file input after successful upload
        setFileName("No file selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload file to Pinata");
      }
    } else {
      alert("Please select a file first.");
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; // Grab the first selected file
    if (data) {
      setFileName(data.name); // Display the file name
      setFile(data);
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        {/* Choose File Button */}
        <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />

        {/* File name or error message */}
        <span className={`textArea ${fileName === "No file selected" ? "error" : ""}`}>
          {fileName}
        </span>

        {/* Upload Button */}
        <button type="submit" className="upload" disabled={!file || !account}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
