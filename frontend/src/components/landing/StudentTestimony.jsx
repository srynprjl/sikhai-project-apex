export default function StudentTestimony(props){
    return(
        <div className="card bg-dark-secondary p-4 rounded-xl flex flex-col gap-5">
            <div className="text-gray-300">
                {props.children}
            </div>
            <div className="flex gap-5 items-center">
                <img src="" alt="" className="w-8 h-8" />
                <div className="flex flex-col">
                    <div className="text-sm text-white font-medium">{props.name}</div>
                    <div className="text-gray-200 text-xs">Student, Sikhai</div>
                </div>    
            </div>

        </div>
    )
}
