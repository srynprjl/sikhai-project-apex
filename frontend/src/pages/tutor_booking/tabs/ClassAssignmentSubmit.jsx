import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { Download } from 'lucide-react';
export default function ClassAssignmentSubmit({ classroomId, assignmentId }){
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get(`/api/classrooms/${classroomId}/assignments/${assignmentId}/submissions/`);
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

  if (loading) return <p className="text-gray-300">Loading submissions...</p>;

  return (
    <div className="mt-4 p-4 rounded-md bg-dark-tertiary">
      <h5 className="font-semibold text-lg mb-3 text-white">Student Submissions</h5>
      {submissions.length === 0 ? (
        <p className="text-gray-400">No submissions for this assignment yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="p-3 bg-dark-secondary">
              <p className="font-medium text-white">Student: {submission.username}</p>
              <p className="text-gray-200 text-sm">
                Submitted: {new Date(submission.submitted_at).toLocaleString()}
              </p>
              {console.log(submission.submitted_file)}

              {submission.submitted_file && (
                <a
                  href={"http://127.0.0.1:8000" + submission.submitted_file}
                  target="_blank"
                  className="text-white hover:underline text-sm flex items-center mb-3 gap-1"
                >
                  <Download />
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
