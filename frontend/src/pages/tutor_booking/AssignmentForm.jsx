import { useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate, useParams } from 'react-router';
import api from '../../api';

const AssignmentFormPage = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState("");
  const {classroomId} = useParams()
  const navigate = useNavigate()
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);  
    console.log(file)
  };

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    console.log(file)
    formData.append('title', title);
    formData.append('description', description);
    formData.append('due_date', deadline); 
    formData.append('assignment_file', file);
    try {
      const res = await api.post(`/api/classrooms/${classroomId}/assignments/`, formData);
      alert("Assignment created")
      navigate(`/classroom/${classroomId}`)
    } catch (e){
      alert("Failed to create assignment")
    }
  }
  return (
    <DashboardLayout>
            <div className="p-8 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className='flex items-center justify-between  mb-6'>
        <h1 className="text-3xl font-bold text-black">Create New Assignment</h1>
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2  disabled:opacity-50 transition duration-300"
        >
          Create Assignment
        </button>
        </div>
        <div>
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-white text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
          ></textarea>
        </div>
        <div>
          <label htmlFor="deadline" className="block text-white text-sm font-bold mb-2">
            Deadline:
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            onChange={(e) => setDeadline(e.target.value)}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            required
          />
        </div>
        <div>
          <label htmlFor="assignment_file" className="block text-white text-sm font-bold mb-2">
            Upload Assignment File:
          </label>
          <input
            type="file"
            id="assignment_file"
            name="assignment_file"
            onChange={handleFileChange}
            className="block w-full text-sm text-white  cursor-pointer bg-dark-secondary focus:outline-none file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold file:bg-dark-tertiary file:text-white "
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
  );
};

export default AssignmentFormPage;
