import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

export default function ClassFiles({ classroomId, isTutor }){
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await api.get(`/api/classrooms/${classroomId}/files/`);
        setFiles(response.data);
      } catch (err) {
        console.error('Failed to fetch files:', err);
      }
    };
    fetchFiles();
  }, [classroomId]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!fileToUpload) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('classroom_id', classroomId);
    formData.append('file', fileToUpload);

    try {
      const response = await api.post(`/api/classrooms/${classroomId}/files/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFiles([...files, response.data]);
      setFileToUpload(null);
      alert('File uploaded successfully!');
    } catch (err) {
      console.error('File upload failed:', err.response ? err.response.data : err.message);
      alert('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 shadow-md">
      <h3 className="text-2xl font-bold text-white mb-4">Class Files</h3>
      {isTutor && (
        <form onSubmit={handleFileUpload} className="mb-6 p-4  bg-dark-tertiary">
          <h4 className="font-semibold text-lg mb-3 text-white">Upload New File</h4>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-dark-secondary file:text-white hover:file:opacity-75"
          />
          <button
            type="submit"
            disabled={uploading}
            className="mt-4 bg-accent  px-5 py-2 hover:opacity-75 text-black disabled:opacity-50 transition duration-300"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
      )}

      {files.length === 0 ? (
        <p className="text-gray-600">No files available yet.</p>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <a
                href={file.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                {file.file.split('/').pop()} {/* Display filename */}
              </a>
              <span className="text-gray-500 text-sm">
                Uploaded: {new Date(file.uploaded_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
