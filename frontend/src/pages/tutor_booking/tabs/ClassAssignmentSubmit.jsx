import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
export default function ClassAssignmentSubmit({ classroomId, assignmentId }){
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get(`/api/classrooms/${classroomId}/assignments/${assignmentId}/submissions/`);
        console.log(response.data)
        setSubmissions(response.data);
      } catch (err) {
        console.error('Failed to fetch submissions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [assignmentId]);

  const handleGradeChange = (submissionId, field, value) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === submissionId ? { ...sub, [field]: value } : sub))
    );
  };

  const handleSaveGrade = async (submissionId) => {
    const submissionToGrade = submissions.find((sub) => sub.id === submissionId);
    if (!submissionToGrade) return;

    try {
      await api.patch(`/api/assignment-submissions/${submissionId}/`, {
        grade: submissionToGrade.grade,
        feedback: submissionToGrade.feedback,
      },{
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
      alert('Grade saved successfully!');
    } catch (err) {
      console.log(err)
    }
  };

  if (loading) return <p className="text-gray-500">Loading submissions...</p>;

  return (
    <div className="mt-4 p-4 rounded-md bg-dark-tertiary">
      <h5 className="font-semibold text-lg mb-3 text-white">Student Submissions</h5>
      {submissions.length === 0 ? (
        <p className="text-gray-400">No submissions for this assignment yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="p-3 bg-dark-secondary">
              <p className="font-medium text-white">Student: {submission.student}</p>
              <p className="text-gray-200 text-sm">
                Submitted: {new Date(submission.submitted_at).toLocaleString()}
              </p>
              {submission.submission_file && (
                <a
                  href={submission.submission_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline text-sm flex items-center mb-3 gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.414L14.586 5A2 2 0 0115 6.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download Submission
                </a>
              )}
              <div className="mt-3 flex items-center space-x-2">
                <label className="text-sm font-medium text-white">Grade:</label>
                <input
                  type="number"
                  step="0.01"
                  value={submission.grade || ''}
                  onChange={(e) => handleGradeChange(submission.id, 'grade', e.target.value)}
                  className="w-24 px-2 py-1 text-sm bg-dark-secondary"
                  placeholder="e.g., 85.5"
                />
                <label className="text-sm font-medium text-white">Feedback:</label>
                <textarea
                  value={submission.feedback || ''}
                  onChange={(e) => handleGradeChange(submission.id, 'feedback', e.target.value)}
                  className="w-24 px-2 py-1 text-sm text-white bg-dark-secondary"
                  placeholder="Provide feedback..."
                  rows="1"
                ></textarea>
                <button
                  onClick={() => handleSaveGrade(submission.id)}
                  className="bg-accent text-white px-3 py-1 rounded-md text-sm hover:opacity-75 transition duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
