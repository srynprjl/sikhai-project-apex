import { useState } from "react";
import EditorJS from "../../components/Editor";
import { useParams } from "react-router";

export default function NotePage(props) {
  const INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "This is a tutorial of Editor js",
          level: 2,
        },
      },
    ],
  };

  const [data, setData] = useState(INITIAL_DATA);
  const {id} = useParams();
  return (
    <>
      <div className="p-10">
        <form action="">
          <h1>
            <input
              placeholder="Title"
              className="text-6xl font-black outline-0"
              value={id}
            />
          </h1>
          <div className="properties"></div>
          <hr />
          <div id="editor" className="">
            <EditorJS
              data={data}
              onChange={setData}
              editorBlock="editorjs-container"
                
            />
          </div>
        </form>
      </div>
    </>
  );
}
