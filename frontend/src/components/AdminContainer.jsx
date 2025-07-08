export default function AdminContainer(props){
    return(
        <div className="bg-[#ffedc9] p-4  rounded-md w-full flex justify-between">
            <div className="flex gap-8 items-center">
                <div className="text-2xl">{props.id}</div>
                <div className="text-black font-black text-2xl">{props.title}</div>

            </div>
            <div className="rounded-md flex gap-2">
                <button className="bg-green-600 font-black p-2 rounded-xl text-white w-20">{props.approve ? "Approve" : "Update"}</button>
                <button className="bg-red-600 font-black p-2 rounded-xl text-white w-20" onClick={props.deleteSrc}>{props.approve ? "Deny" : "Delete"}</button>
            </div>
        </div>
    )
}