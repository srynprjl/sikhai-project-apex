import { Pen, Trash } from "lucide-react";
import { useState } from "react";

export default function Tasks(props) {
    
  const [completed, setCompleted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);
  function handleComplete() {}
  function handleHover(e) {
    e == "enter" ? setHover(true): setHover(false);
  }
  return (
    <>
      {!completed ? (
        <div className="py-2 px-2 flex gap-5 flex-col bg-productivity-bg w-full rounded-md ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <input
                type="checkbox"
                value={completed ? "on" : "off"}
                onClick={handleComplete}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full  border border-gray-300 checked:bg-blue-600 "
              />
              <div className={completed ? "line-through decoration-2" : ""}>
                {props.name}
              </div>
            </div>
            <div onClick={() => setExpanded(prev => !prev)} onMouseOver={() => handleHover("enter")} onMouseLeave={() => handleHover("leave")}>{hover ? <div className="flex gap-1"><button className="bg-green-400 p-1 rounded-md"><Pen size={16}/></button> <button className="bg-red-500 p-1 rounded-md"><Trash size={16}/></button></div> :<input type="date" value={props.dueDate} />}</div>
          </div>
          {
            expanded ? <div className="text-sm ">
            {props.description}
          </div> : null
          }
        </div>
      ) : null}
    </>
  );
}
