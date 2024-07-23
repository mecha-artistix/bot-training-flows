import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function sanitizeText(string) {
  const sanitized = string
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase();
  return sanitized;
}

function ImportTextFile() {
  const [fileContent, setFileContent] = useState({
    fileName: '',
    fileBody: '',
  });
  const token = Cookies.get('bearer_token');
  const navigate = useNavigate();

  const handleFileRead = (e) => {
    const file = e.target.files[0];
    // console.log('file before ', file);
    if (file) {
      // console.log('file after ', file);
      setFileContent({ fileName: sanitizeText(file.name), fileBody: '' }); // Clear fileBody initially
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileBody = e.target.result;
        setFileContent((prev) => ({ ...prev, fileBody }));

        // Automatically submit the form after the file is read
        try {
          console.log(fileContent);
          const response = await fetch(`${import.meta.env.VITE_NODE_BASE_API}bots/`, {
            method: 'POST',
            headers: {
              authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: sanitizeText(file.name),
              promptText: fileBody,
            }),
          });
          if (!response.ok) throw new Error(response);
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
      <input type="file" id="file_input" onChange={handleFileRead} className="hidden" />
    </div>
  );
}

export default ImportTextFile;
