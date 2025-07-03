
import { useState } from 'react';
import EditorJS from '../../components/Editor';

const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is a tutorial of Editor js",
        level: 1
      }
    }
  ]
}

export default function NoteCreate() {


  const [data, setData] = useState(INITIAL_DATA)
  return (
    <>
      <div className="p-8">
        <form action="">
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
