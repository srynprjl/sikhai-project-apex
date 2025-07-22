import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/api/Editor";
import api from "../../api";

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: { text: "Write your notes here", level: 1 },
    },
  ],
  version: "2.31.0-rc.7",
};

export default function NoteCreate() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState(INITIAL_DATA);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", {
        title,
        content: data,
      });
      alert("Note created successfully!");
      navigate(`/notes/`);
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note.");
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <input
            placeholder="Title..."
            className="text-4xl font-black outline-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />     

        <button
          type="submit"
          className="bg-accent px-4 py-2 text-white font-bold mt-4"
        >
          Create Note
        </button>
        </div>
        <div>
          <div>
            <input type="checkbox" /> <label>Make this note public</label>
          </div>
          <div>
            <label>Price: </label><input type="number" step={0.01} className="w-16 decoration-0 border-b "/> 
          </div>
        </div>

        <div className="flex justify-start">
          <div id="editor" className="prose-em text-white w-full">
          <Editor data={data} onChange={setData} editorBlock="editorjs-container" />
        </div>
        </div>

        
      </form>
    </div>
  );
}
