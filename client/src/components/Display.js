import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [fileLinks, setFileLinks] = useState([]); // Store fetched file links

  const getData = async () => {
    let dataArray;

    try {
      // Fetch data using the user's account
      dataArray = await contract.display(account);
    } catch (e) {
      alert("You don't have access");
      return; // Exit if there's an error
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const strArray = dataArray.toString().split(","); // Convert to array
      setFileLinks(strArray); // Store the file links
    } else {
      alert("No files to display");
    }
  };

  return (
    <>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
      
      {/* Display file names as hyperlinks only when files are fetched */}
      {fileLinks.length > 0 && (
        <div className="file-list">
          {fileLinks.map((item, i) => (
            <div key={i} className="file-item">
              <a href={item} target="_blank" rel="noopener noreferrer">
                {`File ${i + 1}`}
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Display;
