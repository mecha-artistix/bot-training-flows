import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImportTextFile() {
  const [fileContent, setFileContent] = useState({
    fileName: '',
    fileBody: '',
  });
  //   const [fileText, setFileText] = useState('');s
  const userID = localStorage.getItem('userID');
  const navigate = useNavigate();

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileContent({ fileName: file.name, fileBody: '' }); // Clear fileBody initially
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileBody = e.target.result;
        setFileContent((prev) => ({ ...prev, fileBody }));

        // Automatically submit the form after the file is read
        try {
          const response = await fetch(import.meta.env.VITE_NODE_BASE_API + `promptfiles/${userID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: file.name,
              promptText: fileBody,
              user: userID,
            }),
          });
          const data = await response.json();
          console.log('File submitted successfully:', data);
          navigate('/knowledgebase');
        } catch (error) {
          console.error('Error submitting file:', error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label htmlFor="file_input" className="cwu_accent_btn">
        Import File
      </label>
      <input type="file" accept=".txt" id="file_input" onChange={handleFileRead} className="hidden" />
    </div>
  );
}

export default ImportTextFile;
