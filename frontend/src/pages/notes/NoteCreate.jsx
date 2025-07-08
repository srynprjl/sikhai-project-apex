
import { useState, version } from 'react';
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
  ],
  version: '2.31.0-rc.7'
}

export default function NoteCreate() {

  const [title, setTitle] = useState("");
  const [data, setData] = useState(INITIAL_DATA)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(data)
      await api.post("/api/notes/", {
        title: title,
        content: data,
      });

      alert("Note created successfully!");
      navigate("/notes"); 
    } catch (error) {
  console.error("Error creating note:", error);
  if (error.response) {
    console.log("Response data:", error.response.data);
    alert("Failed to create note: " + JSON.stringify(error.response.data));
  } else {
    alert("Failed to create note.");
  }
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
              onChange={(e) => setTitle(e.target.value)}
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
