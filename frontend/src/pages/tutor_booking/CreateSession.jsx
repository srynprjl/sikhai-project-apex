import { useNavigate, useParams } from 'react-router';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState } from 'react';
import api from '../../api';

const SessionFormPage = () => {
  const {classroomId} = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [meet, setMeet] = useState();
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    const payload = {
      title: title,
      description: description,
      scheduled_at: date,
      google_meet_link: meet
    }
    try{
      const res = await api.post(`/api/classrooms/${classroomId}/sessions/`, payload)
      navigate(`/classroom/${classroomId}`)
    } catch (e){
      alert("Failed to create session")
    }
  }

  return (
    <DashboardLayout>
            <div className="p-8 shadow-md">
      <form onSubmit={handleSubmit}  className="space-y-4 text-white">
        <div className='flex items-center justify-between mb-6'>
            <h1 className="text-3xl font-bold mb-6">Create New Session</h1>

            <button
            type="submit"
            className="bg-accent text-black px-6 py-2  disabled:opacity-50 transition duration-300"
            >
          Create Session
        </button>
        </div>
          <div>
          <label htmlFor="time" className="block  text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="title"
            id="title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Session Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
          ></textarea>
        </div>
        <div>
          <label htmlFor="time" className="block  text-sm font-bold mb-2">
            Session Date and Time:
          </label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="google_meet_link" className="block  text-sm font-bold mb-2">
            Google Meet Link (Optional):
          </label>
          <input
            type="url"
            id="google_meet_link"
            name="google_meet_link"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            onChange={(e) => setMeet(e.target.value)}
            placeholder="e.g., https://meet.google.com/abc-defg-hij"
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
  );
};

export default SessionFormPage;
