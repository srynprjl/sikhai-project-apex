import { HomeIcon, CircleCheckBig, Notebook, NotebookPen, Presentation, Pencil, UserRoundCog, BookCheck, Bolt, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../api";


export default function Sidebar(props){
    const navigate = useNavigate()
    const [closed, setClosed] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isTutor, srtIsTutor] = useState(false)

    const sidebarClose = (type) => {
        setTimeout(() => {
            setClosed(type === "open" ? false : true)
        }, 200)
    }

    useEffect(() => {
        async function fetchData(){
            const {data} = await api.get("/api/user/info/")
            setIsAdmin(data.is_admin)
        }

        fetchData()    
    }, [])



    return(
        <>
        <div className={"flex flex-col left-0 bg-white fixed h-[100vh] justify-between gap-4 p-5 rounded-xl " + (closed ? " w-64 z-50" : " w-16")} onMouseOver={() => sidebarClose("close")} onMouseLeave={() =>sidebarClose("open")} >
            <div className={"flex flex-col gap-2 " + (!closed ? "items-center" : "")}>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } >{closed ? <div className="font-black text-xl">SIKHAI</div> : <Menu />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/dashboard')}>{closed ? <div className="font-semibold text-lg flex gap-4"> <HomeIcon /> Home</div> : <HomeIcon />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/todos')}>{closed ? <div className="font-semibold text-lg flex gap-4"><CircleCheckBig /> Tasks</div> : <CircleCheckBig />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/notes')}>{closed ? <div className="font-semibold text-lg flex gap-4"><NotebookPen /> Notes</div> : <NotebookPen />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/notes/browse')}>{closed ? <div className="font-semibold text-lg flex gap-4"><Notebook /> Public Notes</div> : <Notebook />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/whiteboard')}>{closed ? <div className="font-semibold text-lg flex gap-4"><Presentation /> Boards</div> :<Presentation />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/tutors')}>{closed ? <div className="font-semibold text-lg flex gap-4"><BookCheck /> Tutor</div> :<BookCheck />}</button></span>
                { isAdmin ? <span><button className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/admin')}>{closed ? <div className="font-semibold text-lg flex gap-4"><UserRoundCog /> Tutor</div> :<UserRoundCog />}</button></span> : null}

            </div>

            <div className="flex flex-col gap-2 items-center">
                <div className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") }>{closed ? <div className="font-semibold text-lg flex gap-4"><Bolt /> Settings</div> :<Bolt />}</div>
                <div className={"hover:bg-sidebar-items p-1 rounded-md"  + (closed ? " w-56" : "") } onClick={ () => navigate('/logout')}>{closed ? <div className="font-semibold text-lg flex gap-4"><LogOut /> LogOut</div> :<LogOut />}</div>
            </div>
        </div>

        </>
    )
}