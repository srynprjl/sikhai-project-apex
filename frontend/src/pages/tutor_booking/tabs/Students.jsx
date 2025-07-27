import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

export default function Students({ classroomId }){
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`/api/classrooms/${classroomId}/enrolled_students/`);
        setStudents(res.data);
      } catch (err) {
        setError('Failed to fetch student list.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [classroomId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Students</h3>
      {students.length === 0 ? (
        <p className="text-gray-600">No students have enrolled in this classroom yet.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {students.map((data, index) => (
            <li key={index} className="text-gray-700">
              {data.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
