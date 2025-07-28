import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../../api';
import { Video } from 'lucide-react';

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
    <div className="p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-white mb-4">Class Sessions</h3>
      {isTutor && (
        <Link
          to={`/classroom/${classroomId}/sessions/new`}
          className="inline-block bg-accent text-black px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 mb-6"
        >
          Create New Session
        </Link>
      )}
      {sessions.length === 0 ? (
        <p className="text-gray-300">No sessions scheduled yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 bg-dark-tertiary flex justify-between">
              <div>
                <p className="text-gray-300 font-bold text-sm mb-2">{session.description}</p>
              <p className="text-gray-200 text-xs mb-2">
                Time: {new Date(session.scheduled_at).toLocaleString()}
              </p>
              </div>
              {session.google_meet_link && (
                <a
                  href={session.google_meet_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black gap-2 flex items-center text-xs bg-accent px-2 "
                > 
                  <Video />
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
