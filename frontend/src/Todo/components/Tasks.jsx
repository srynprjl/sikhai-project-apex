import { useState } from "react";

export default function Tasks(props) {
  const [completed, setCompleted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  function handleComplete() {}

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
            <div onClick={() => setExpanded(prev => !prev)}>{props.dueDate}</div>
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
