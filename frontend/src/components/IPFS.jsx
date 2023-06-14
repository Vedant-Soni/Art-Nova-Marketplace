import React, { useState } from 'react';

export const IPFS = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div>
      <h1>File Input</h1>
      <input
        type="file"
        accept="image/*, audio/*, video/*"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <div>
          <h2>Selected File:</h2>
          <p>Name: {selectedFile.name}</p>
          <p>Size: {selectedFile.size} bytes</p>
          <p>Type: {selectedFile.type}</p>
          {selectedFile.type.startsWith('image/') && (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected File" />
          )}
          {selectedFile.type.startsWith('audio/') && (
            <audio controls>
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
            </audio>
          )}
          {selectedFile.type.startsWith('video/') && (
            <video controls>
              <source
                src={URL.createObjectURL(selectedFile)}
                type={selectedFile.type}
              />
            </video>
          )}
        </div>
      )}
    </div>
  );
};
