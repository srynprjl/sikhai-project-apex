import { CirclePlus, Delete, Edit, Trash } from "lucide-react";

export default function TodoContainer(props) {
  return (
    <>
      <div className="todo-container h-96  bg-dark-secondary p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <h1 className="font-semibold">{props.name}</h1>
            <div className="flex gap-2 items-center">
              <CirclePlus size={16} onClick={props.createTask} />
              {/* <Edit size={16}  onClick={props.updateFunction} /> */}
              <Trash size={16} onClick={props.deleteFunction} />
            </div>

        </div>
        <div className="tasks text-justify font-sans text-xs flex flex-col gap-2 overflow-hidden">{props.children}</div>
      </div>
    </>
  );
}
