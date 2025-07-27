import { Edit, FolderOpen, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClassroomContainer(props) {

  return (
    <>
    <div key={props.id} className="note-container h-72 w-full bg-dark-secondary p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">{props.name}</h2>
              <p className="">{props.description}</p>
              </div>
              <div className="flex justify-between">
                <div>
                    <p className="">Nrs {props.price}</p>  
                </div>
                <div className="flex gap-4  justify-end">
                    <Link
                    to={`/classroom/${props.id}`}
                    className=" text-white  "
                    >
                        <FolderOpen />
                    </Link>
                    {!props.isPublic ? <>
                    <Link
                    to={`/classroom/manage/edit/${props.id}`}
                    className=" text-white"
                    >
                        <Edit />
                    </Link>
                    <button
                    onClick={() => props.handleDelete(props.id)}
                    className=" text-white"
                    >
                        <Trash />
                    </button>
                    </> : null}
              </div>
              </div>
              
            </div>
      
    </>
  );
}
