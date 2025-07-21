import { Plus, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardView(props) {
  const [count, setCount] = useState(props.count);
  const [title, setTitle ] = useState(props.title)
  const navigate = useNavigate()

  return (

    <div className={(props.firstContainer ? "p-8 " : "") + "flex flex-col gap-3"}>
        {props.searchVisible ? <input type="search"  placeholder="Search..."  className="text-lg font-sans outline-0 bg-dark-secondary p-2"/>
        : null}
      <div className="flex justify-between items-center">
        {props.titleVisible ? <div className="flex gap-2 items-center">
          <span className="text-white text-4xl font-sans">{count}</span>
          <h1 className="font-sans text-lg">matching {title} found</h1>
          
        </div> : null}
        <div>
          {props.btnVisible ? <button
            className="flex items-center bg-accent px-7 py-3 gap-1 text-black font-sans text-xs"
            onClick={props.btnSrc ? () => navigate(props.btnSrc) : props.btnFnc}
          >
            <PlusCircle size={16} />
            Create {props.btnName}
          </button> : null}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {props.children}
      </div>
      
    </div>
  );
}
