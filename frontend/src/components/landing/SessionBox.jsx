import { useNavigate } from "react-router"

export default function SessionBox(props){
    const navigate = useNavigate()
    return(
        <>
            <div className="card bg-dark-secondary w-full p-2 flex flex-col self-center">
                <img src={props.img} alt="" className=" mb-5"/>
                <div className="flex justify-between text-xs my-2">
                    <div className="text-gray-200" >{props.tutor}</div>
                    <div className="text-yellow-400">{"★".repeat(props.rating) + "☆".repeat(5-props.rating)}</div>
                </div>
                <div className="font-semibold text-white">{props.subject}</div>
                <hr className="mt-2 border-dotted"/>
                <div className="relative text-center top-8">
                    <button className="bg-accent py-2 px-4 font-bold text-black " onClick={() => navigate("/classroom")}>Book Now</button>
                </div>
            </div>
            
        </>
    )
}
