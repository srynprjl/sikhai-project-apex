import { useEffect, useState } from "react";
import EditorJS from "../../components/Editor";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import api from "../../api";

export default function NotePage(props) {
  const params = useParams();

  const [title, setTitle] = useState("");

  const [noteData, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData(id) {
      const { data } = await api.get(`/api/notes/${id}/`);
      setTitle(data.title);
      setData(data.content);
    }

    fetchData(params.id);
  }, []);

  function updateNote() {}

  async function deleteNote(id) {
    const response = await api.delete(`/api/notes/${id}/`);
    navigate(0);
  }

  return (
    <>
      <div className="p-10">
        <form action="">
          <h1>
            <input
              placeholder="Title"
              className="text-6xl font-black outline-0"
              value={title}
            />
          </h1>
          <div className="properties"></div>
          <hr />
          <div id="editor" className="">
            {noteData && noteData.blocks ? (
              <EditorJS
                data={noteData}
                onChange={setData}
                editorBlock="editorjs-container"
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
