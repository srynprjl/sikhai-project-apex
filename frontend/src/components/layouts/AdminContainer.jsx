import { Check, Eye, Trash, X } from "lucide-react";

export default function AdminContainer(props) {
  return (
    <>
        <div className=" rounded-md w-full flex justify-between text-white">
      <div className="flex gap-8 items-center">
        <div className="text-2xl">{props.id}</div>
        <div className="text-white font-black text-[min(24vw, 32vw)] ">{props.title}</div>
      </div>
      <div className="flex gap-2">

        { props.tutor && <button
          className="hover:bg-accent font-black p-2 text-white w-20 flex gap-1 items-center justify-center"
          onClick={props.viewSrc}
        >
          <Eye /> View
        </button>
        }

        <button
          className="hover:bg-accent font-black p-2 text-white w-20"
          onClick={props.updateSrc}
        >
          {props.approve ? <div className="flex gap-1 items-center justify-center "><Check size={16}/> Approve</div> : <div className="flex gap-2"><Eye /> View</div> }
        </button>
        <button
          className="hover:bg-red-600 font-black p-2 text-white w-20"
          onClick={props.deleteSrc}
        >
          {props.approve ?<div className="flex gap-2"><X /> Deny</div>  : <div className="flex gap-2"><Trash /> Delete</div> }
        </button>
      </div>
    </div>
    <hr />
    </>
  );
}
