import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../../components/api/Editor";
import api from "../../api";
import DashboardLayout from "../../components/layouts/DashboardLayout";

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
  const [isPublic, setIsPublic] = useState(false);
  const [price, setPrice] = useState(0.0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/notes/", {
        title,
        content: data,
        isPublic,
        price,
      });
      alert("Note created successfully!");
      navigate(`/notes/`);
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note.");
    }
  };

  return (
    <DashboardLayout>
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
            <input type="checkbox"
            checked={isPublic}
              onChange={(e) => {
                setIsPublic((prev) => !prev);
              console.log(isPublic);
            }}
            /> <label>Make this note public</label>
          </div>
          {isPublic ? (<div>
            <label>Price: </label><input type="number" step={0.01} 
            onChange={(e) => setPrice(e.target.valueAsNumber)}className="w-16 decoration-0 border-b "/> 
          </div>
          ) : null}
        </div> 
        

        <div className="flex justify-start">
          <div id="editor" className="prose-em text-white w-full">
          <Editor data={data} onChange={setData} editorBlock="editorjs-container" />
        </div>
        </div>

        
      </form>
    </div>
    </DashboardLayout>
  );
}