import { CirclePoundSterling, Expand, Trash } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function NoteContainer(props) {
  return (
    <>
      <div className="note-container h-auto bg-[#ffedc9] p-4 rounded-2xl flex flex-col gap-2 justify-between">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.name} <span className="text-sm text-gray-600"> {props.author ? "by " + props.author : ""}</span></h1>
          <button className="cursor-pointer rounded-full p-2">
            <Expand size={16} />
          </button>
        </div>
        <div className="tasks text-justify flex flex-col gap-2 prose">
          <ReactMarkdown>
            {props.children.toString().substr(0, 500)}
          </ReactMarkdown>
        </div>
        <div className="btn flex justify-between items-center">
          <div className="space-x-4 flex items-center">
            <div className="bg-red-400 p-2 rounded-full w-10 h-10"><button><Trash  /></button></div>
            {props.isPublic ? <div className="bg-green-400 p-2 rounded-full w-10 h-10"><button><CirclePoundSterling  /></button></div> : null}
          </div>
          
          {props.isPublic ? <div>Price: रु {props.price != null ? props.price : "0.00"}</div>: null}
        </div>
      </div>
    </>
  );
}
