import React, { useEffect, useState } from 'react';
import api from '../../../api';
import ClassAssignmentSubmit from './ClassAssignmentSubmit';
import { Link } from 'react-router';
import { Download } from 'lucide-react';

export default function ClassAssignments({ classroomId, isTutor }){
  const [assignments, setAssignments] = useState([]);
  const [submissionFiles, setSubmissionFiles] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await api.get(`/api/classrooms/${classroomId}/assignments/`);
        console.log(response)
        setAssignments(response.data);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
      }
    };
    fetchAssignments();
  }, [classroomId]);

  const handleFileChange = (assignmentId, e) => {
    setSubmissionFiles({ ...submissionFiles, [assignmentId]: e.target.files[0] });
  };

  const handleSubmitAssignment = async (assignmentId) => {
    if (!submissionFiles[assignmentId]) {
      alert('Please select a file to submit.');
      return;
    }

    setSubmitting({ ...submitting, [assignmentId]: true });
    const formData = new FormData();
    formData.append('assignment', assignmentId)
    formData.append('submitted_file', submissionFiles[assignmentId]);

    try {
      await api.post(`/api/assignment-submissions/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Assignment submitted successfully!');
    } catch (err) {
      console.error('Assignment submission failed:', err.response ? err.response.data : err.message);
      alert('Failed to submit assignment.');
    } finally {
      setSubmitting({ ...submitting, [assignmentId]: false });
    }
  };

  const allClassAssignments = assignments.map((assignment) => (
            <div key={assignment.id} className=" p-5 bg-dark-secondary">
              <h4 className="font-semibold text-xl text-white mb-2">{assignment.title}</h4>
              <p className="text-white text-sm mb-3">{assignment.description}</p>
              <p className="text-white text-xs mb-2">
                Deadline: {new Date(assignment.deadline).toLocaleString()}
              </p>
              {assignment.assignment_file && (
                <a
                  href={assignment.assignment_file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline text-sm flex items-center mb-3 gap-1"
                >
                  <Download size={16} />
                  Download Assignment File
                </a>
              )}

              {!isTutor && ( 
                <div className="mt-4 p-4 bg-dark-tertiary">
                  <h5 className="font-medium text-white mb-2">Your Submission</h5>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(assignment.id, e)}
                    className="block w-full text-sm text-white cursor-pointer bg-dark-secondary focus:outline-none file:mr-4 file:py-2 file:px-4  file:border-0 file:text-sm file:font-semibold file:bg-dark-tertiary file:text-accent hover:file:bg-dark-primary"
                  />
                  <button
                    onClick={() => handleSubmitAssignment(assignment.id)}
                    disabled={submitting[assignment.id]}
                    className="mt-3 bg-accent text-black px-4 py-2 rounded-md hover:opacity-65 disabled:opacity-50 transition duration-300"
                  >
                    {submitting[assignment.id] ? 'Submitting...' : 'Submit Assignment'}
                  </button>
                </div>
              )}

              {isTutor && ( // Tutor view for submissions
                <div className="mt-4">
                  <ClassAssignmentSubmit classroomId={classroomId} assignmentId={assignment.id} />
                </div>
              )}
            </div>
))

  return (
    <div className="p-6 rounded-lg shadow-md">
      <div className='flex justify-between'>
        <h3 className="text-2xl font-bold">Class Assignments</h3>
      {isTutor && (
        <Link
          to={`/classroom/${classroomId}/assignments/new`}
          className="inline-block bg-accent text-black px-5 py-2 rounded-md transition duration-300 mb-6"
        >
          Create New Assignment
        </Link>
      )}
      
      </div>
      {assignments.length === 0 ? (
        <p className="text-white">No assignments available yet.</p>
      ) : (
        <div className="gap-2 grid grid-cols-2">
          {allClassAssignments}
        </div>
      )}
    </div>
  );
};
