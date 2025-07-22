import { Edit, Pen, Trash } from "lucide-react";
import { useState } from "react";

export default function Tasks(props) {
    
  const [completed, setCompleted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  function handleComplete() {
    setCompleted(prev => !prev)
  }

  return (
    <>
      
        <div className="py-2 px-2 flex gap-5 flex-col bg-dark-tertiary w-full ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                value={completed ? "on" : "off"}
                onClick={handleComplete}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full border border-accent checked:bg-accent "
              />
              <div onClick={() => setExpanded(prev => !prev)} className={completed ? "line-through decoration-2" : ""}>
                {props.name}
              </div>
            </div>
            <div > <div className="flex gap-2 "><Edit size={16} className="hover:scale-110" /><Trash size={16} className="hover:scale-110"/></div></div>
          </div>
          {
            expanded ? <div className="text-xs">
            {props.description}
          </div> : null
          }
        </div>
      
    </>
  );
}
