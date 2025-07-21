import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorJSComponent from "../../components/Editor";
import api from "../../api";

export default function NoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load note data on mount
  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`/api/notes/${id}/`);
        setTitle(res.data.title);
        setData(res.data.content);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading note:", error);
      }
    }
    fetchNote();
  }, [id]);

  // Auto-save on title or content change with debounce
  useEffect(() => {
    if (!isLoaded) return;
    const timeout = setTimeout(() => {
      api.put(`/api/notes/update/${id}/`, { title, content: data }).catch((err) => {
        console.error("Auto-save error:", err);
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [title, data, id, isLoaded]);
  
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <form>
        <input
            placeholder="Title..."
            className="text-4xl font-black outline-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />   
                  <div>
          <div>
            <input type="checkbox" /> <label>Make this note public</label>
          </div>
          <div>
            <label>Price: </label><input type="number" step={0.01} className="w-16 decoration-0 border-b "/> 
          </div>
        </div>
        <div id="editor" className="prose-em prose-invert">
          <EditorJSComponent data={data} onChange={setData} editorBlock="editorjs-container" />
        </div>
      </form>
    </div>
  );
}
