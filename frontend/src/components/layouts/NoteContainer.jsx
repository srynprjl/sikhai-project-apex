import { CirclePoundSterling, ExternalLink, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export default function NoteContainer(props) {
    const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(jwtDecode(localStorage.getItem("access")).user_id);
  }, []);

  return (
    <>
      <div className="note-container h-72 bg-dark-secondary p-4 flex flex-col gap-1 justify-between">
        <div>
          <div className="flex flex-col justify-between">
          <h1 className="font-semibold">{props.name}</h1>
          <h2 className="text-sm text-white font-semibold"> {props.author ? "by " + props.author : ""}</h2>
        </div>
        <div className="tasks flex flex-col gap-2 prose prose-invert overflow-hidden ">
            {props.children}
        </div>
        </div>
        <div className="">
          <div className=" flex items-center justify-between">
            <div className="flex gap-4">
              {console.log(props.bought)}
              {props.isPublic && props.author != user && !props.bought ? <><CirclePoundSterling  onClick={() => props.handlePurchase(props.id, props.name, props.price)} /> 
                रु {props.price != null ? props.price : "0.00"}</>: (props.bought  ? "Already Bought": null)}
            </div>

            <div className="flex gap-3 ">
              <ExternalLink onClick={props.onClick}/>
              {!props.isPublic || props.author == user ? (
              <Trash onClick={props.delete}/>
              ) : null}
            </div>
          </div>
        </div>
        </div>
      
    </>
  );
}