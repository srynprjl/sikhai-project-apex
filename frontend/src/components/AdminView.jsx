import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AdminView(props) {
  const [count, setCount] = useState(props.count);
  const navigate = useNavigate()
  const [title, setTitle] = useState(props.title)

  useEffect(()=>{
    setCount(props.count)
  } ,[count])
  return (

    <div className={(props.firstContainer ? "p-8 " : "") + "flex flex-col gap-3"}>
        {props.searchVisible ? <><input type="search"  placeholder="Search..." onChange={(e) => setTitle(props.title + (e.target.value ? " matching " + e.target.value : " " ))} className="text-xl font-bold outline-0"/>
        <hr /></> : null}
      <div className="flex justify-between">
        {props.titleVisible ? <div className="flex gap-4 items-center">
          <h1 className="font-extrabold text-2xl">{title}</h1>
          <span className="text-gray-600 text-xl font-bold">( {count} )</span>
        </div> : null}
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
      <div className="grid grid-cols-1 w-full gap-6">
        {props.children}
      </div>
      
    </div>
  );
}
