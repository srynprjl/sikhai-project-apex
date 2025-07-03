export default function SessionBox(props){
    return(
        <>
            <div className="card bg-white w-full rounded-xl p-2 flex flex-col self-center">
                <img src={props.img} alt="" className="rounded-xl mb-5"/>
                <div className="flex justify-between text-xs my-2">
                    <div className="text-gray-500">{props.tutor}</div>
                    <div className="text-yellow-400">{"★".repeat(props.rating) + "☆".repeat(5-props.rating)}</div>
                </div>
                <div className="font-semibold">{props.subject}</div>
                <hr className="mt-2 border-dotted"/>
                <div className="relative text-center top-8">
                    <button className="bg-orange-400 py-2 px-4 font-bold text-white rounded-4xl ">Book Now</button>
                </div>
            </div>
            
        </>
    )
}