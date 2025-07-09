import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api";

export default function TodoCreate() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/todos/", {
        "title": title,
        "description": description,
      });

      alert("Todolist created successfully!");
      navigate(`/todos`);
    } catch (error) {
      console.error("Error creating todo:", error);
      alert("Failed to create todolist.");
    }
  };

  return (
    <> 
    <h1 className="text-center text-2xl font-bold">Create a Todo List</h1>
      <form className="flex flex-col justify-center items-center p-8 gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <label htmlFor="title" className="font-semibold text-xl" >Title</label>
          <input type="text" name="title" className="bg-white border-2 border-btn outline-0 p-2" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-semibold text-xl">Description</label>
          <textarea className="bg-white border-2 border-btn outline-0 p-2" rows={6} name="description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" name="submit" className="w-full bg-btn p-2 text-white font-semibold rounded-lg">
          Create
        </button>
      </form>
    </>
  );
}
