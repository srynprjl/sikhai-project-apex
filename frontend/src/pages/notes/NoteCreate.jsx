import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/Editor";
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
        <h1>
          <input
            placeholder="Title"
            className="text-6xl font-black outline-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </h1>
        <hr />
        <div id="editor" className="prose-em">
          <Editor data={data} onChange={setData} editorBlock="editorjs-container" />
        </div>

        <button
          type="submit"
          className="bg-btn rounded-2xl px-2 py-1 text-white font-bold mt-4"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}
