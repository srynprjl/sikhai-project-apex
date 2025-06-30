import { Trash } from "lucide-react";

export default function TodoContainer(props) {
  return (
    <>
      <div className="todo-container h-auto bg-blue-500 p-4 rounded-2xl flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.name}</h1>
          <button className="bg-red-500 rounded-full p-2">
            <Trash size={16} />
          </button>
        </div>
        <div className="tasks text-justify flex flex-col gap-2">{props.children}</div>
      </div>
    </>
  );
}
