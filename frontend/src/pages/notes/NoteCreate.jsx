
import { useState } from 'react';
import EditorJS from '../../components/Editor';
import api from "../../api"; 
import { useNavigate } from "react-router-dom";

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "Write your notes here",
        level: 1
      }
    }
  ]
}

export default function NoteCreate() {

  const [title, setTitle] = useState("");
  const [data, setData] = useState(INITIAL_DATA)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/notes/", {
        title,
        content: data,
      });

      alert("Note created successfully!");
      navigate("/notes"); 
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note.");
    }
  };

   return (
    <>
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <h1>
            <input
              placeholder="Title"
              className="text-6xl font-black outline-0"
            />
          </h1>
          <div className="properties"></div>
          <hr />
          <div id="editor" className='prose-em'>
            <EditorJS data={data} onChange={setData} editorBlock="editorjs-container" />
          </div>

          <button
            type="submit"
            className="bg-btn rounded-2xl px-2 py-1 text-white font-bold"
          >
            Create Note
          </button>
        </form>
      </div>
    </>
  );
}
