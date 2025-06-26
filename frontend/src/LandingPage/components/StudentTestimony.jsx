export default function StudentTestimony(props){
    return(
        <div className="card bg-white p-4 rounded-xl flex flex-col gap-5">
            <div className="text-gray-500">
                {props.children}
            </div>
            <div className="flex gap-5 items-center">
                <img src="" alt="" className="rounded-full w-8 h-8" />
                <div className="flex flex-col">
                    <div className="text-sm font-medium">{props.name}</div>
                    <div className="text-gray-400 text-xs">Student, Sikhai</div>
                </div>    
            </div>

        </div>
    )
}