import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';

export default function Sessions({ classroomId, isTutor }){
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get(`/api/classrooms/${classroomId}/sessions/`);
        console.log(response.data)
        setSessions(response.data);
      } catch (err) {
        console.error('Failed to fetch sessions:', err);
      }
    };
    fetchSessions();
  }, [classroomId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Class Sessions</h3>
      {isTutor && (
        <Link
          to={`/classroom/${classroomId}/sessions/new`}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 mb-6"
        >
          Create New Session
        </Link>
      )}
      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions scheduled yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <p className="text-gray-700 text-sm mb-2">{session.description}</p>
              <p className="text-gray-600 text-xs mb-2">
                Time: {new Date(session.scheduled_at).toLocaleString()}
              </p>
              {session.google_meet_link && (
                <a
                  href={session.google_meet_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline flex items-center font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Join Google Meet
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
