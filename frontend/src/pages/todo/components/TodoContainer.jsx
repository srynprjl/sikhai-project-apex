import { Trash, Plus } from "lucide-react";

export default function TodoContainer(props) {
  return (
    <>
      <div className="note-container h-auto bg-[#ffedc9] p-4 rounded-2xl flex flex-col gap-2 justify-between">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.name} <span className="text-sm text-gray-600"> {props.author ? "by " + props.author : ""}</span></h1>

        </div>
        <div className="tasks text-justify flex flex-col gap-2">
            {props.children}
            <hr />
            <button className="flex gap-2" onClick={props.addBtn}><Plus />Add Tasks</button>
        </div>
        <div className="btn flex justify-between items-center">
          <div className="space-x-4 flex items-center">
            <div className="bg-red-400 p-2 rounded-full w-10 h-10"><button onClick={props.delete}><Trash  /></button></div>
          </div>
        </div>
      </div>
    </>
  );
}