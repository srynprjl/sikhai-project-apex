import { Trash } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function NoteContainer(props) {
  return (
    <>
      <div className="note-container h-auto bg-[#ffedc9] p-4 rounded-2xl flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.name}</h1>
          <button className="bg-red-300 rounded-full p-2">
            <Trash size={16} />
          </button>
        </div>
        <div className="tasks text-justify flex flex-col gap-2 prose">
            <ReactMarkdown >{props.children.toString().substr(0, 500)}</ReactMarkdown> 
        </div>
      </div>
    </>
  );
}
