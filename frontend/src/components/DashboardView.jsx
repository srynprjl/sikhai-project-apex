import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DashboardView(props) {
  const [count, setCount] = useState(props.count);
  const navigate = useNavigate()

  return (

    <div className={(props.firstContainer ? "p-8 " : "") + "flex flex-col gap-3"}>
        <input type="search"  placeholder="Search..." className="text-xl font-bold outline-0"/>
        <hr />
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="font-extrabold text-2xl">{props.title}</h1>
          <span className="text-gray-600 text-xl font-bold">({count})</span>
        </div>
        <div>
          {props.btnVisible ? <button
            className="flex items-center bg-btn p-2 rounded-4xl text-white font-semibold text-xs"
            onClick={() => navigate(props.btnSrc ? props.btnSrc : "/")}
          >
            {" "}
            <Plus size={16} />
            Create {props.btnName}
          </button> : null}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {props.children}
      </div>
      
    </div>
  );
}
