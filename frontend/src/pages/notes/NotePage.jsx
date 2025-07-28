import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorJSComponent from "../../components/api/Editor";
import api from "../../api";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { jwtDecode } from "jwt-decode";

export default function NoteEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(null);
  const [bought, setBought] = useState(false)
  const [isPublic, setIsPublic] = useState(false);
  const [price, setPrice] = useState(0.0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await api.get(`/api/notes/${id}/`);
        setTitle(res.data.title);
        setData(res.data.content);
        setIsPublic(res.data.isPublic);
        setPrice(res.data.price);
        setAuthor(res.data.author);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading note:", error);
      }
    }

    async function userBoughtNotes() {
      const {data} = await api.get("/api/get-purchased-notes/")
      const isBought = data.some(item => {
        return id == item.note;
    });
      setBought(isBought)
    }

    fetchNote();
    userBoughtNotes();
    setUser(jwtDecode(localStorage.getItem("access")).user_id);
  }, [id]);

  useEffect(() => {
    if (!isLoaded) return;
    const timeout = setTimeout(() => {
      api
        .put(`/api/notes/update/${id}/`, {
          title,
          content: data,
          isPublic,
          price,
        })
        .catch((err) => {
          console.error("Auto-save error:", err);
        });
    }, 100);

    return () => clearTimeout(timeout);
  }, [title, data, id, isPublic, price, isLoaded]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <DashboardLayout>
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
        <div id="editor" className="prose-em prose-invert">
          <EditorJSComponent data={data} onChange={setData} editorBlock="editorjs-container" isPublic={user != author ? true : false}initialBlockLimit={5} hasPaid={user != author ? bought : true}
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
  );
}
