import { Edit, Pen, Trash } from "lucide-react";
import { useState } from "react";
import api from "../../../api";

export default function Tasks(props) {
    
  const [completed, setCompleted] = useState(props.completed);
  const [expanded, setExpanded] = useState(false);

  async function handleComplete(id) {
    setCompleted(prev => !prev)
    const res = await api.patch(`/api/tasks/${id}/toggle-complete/`, {'completed': !completed})
    console.log(res)
  }

  return (
    <>
        <div className="py-2 px-2 flex gap-5 flex-col bg-dark-tertiary w-full ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                // value={completed ? "on" : "off"}
                checked={completed}
                onClick={() => {handleComplete(props.id)}}
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
