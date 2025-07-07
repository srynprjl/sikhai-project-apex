import { HomeIcon, CircleCheckBig, Notebook, NotebookPen, Presentation, Pencil, BookCheck, Bolt, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function Sidebar(props){
    const navigate = useNavigate()
    const [closed, setClosed] = useState(false)

    return(
        <>
        <div className={"flex flex-col left-0 bg-white fixed h-[100vh] justify-between gap-4 p-5 rounded-xl " + (closed ? " w-64 z-50" : " w-16")} onMouseOver={() => setClosed(true)} onMouseLeave={() => setClosed(false)}>
            <div className={"flex flex-col gap-2 " + (!closed ? "items-center" : "")}>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } >{closed ? <div className="font-black text-2xl">SIKHAI</div> : <Menu />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/dashboard')}>{closed ? <div className="font-semibold text-lg flex gap-4"> <HomeIcon /> Home</div> : <HomeIcon />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/todos')}>{closed ? <div className="font-semibold text-lg flex gap-4"><CircleCheckBig /> Tasks</div> : <CircleCheckBig />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/notes')}>{closed ? <div className="font-semibold text-lg flex gap-4"><NotebookPen /> Notes</div> : <NotebookPen />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/notes/browse')}>{closed ? <div className="font-semibold text-lg flex gap-4"><Notebook /> Public Notes</div> : <Notebook />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/whiteboard')}>{closed ? <div className="font-semibold text-lg flex gap-4"><Presentation /> Boards</div> :<Presentation />}</button></span>
                <span><button className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={() => navigate('/tutors')}>{closed ? <div className="font-semibold text-lg flex gap-4"><BookCheck /> Tutor</div> :<BookCheck />}</button></span>
            </div>

            <div className="flex flex-col gap-6 items-center">
                <div className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") }>{closed ? <div className="font-semibold text-lg flex gap-4"><Bolt /> Settings</div> :<Bolt />}</div>
                <div className={"hover:bg-sidebar-items p-2 rounded-md"  + (closed ? " w-56" : "") } onClick={ () => navigate('/logout')}>{closed ? <div className="font-semibold text-lg flex gap-4"><LogOut /> LogOut</div> :<LogOut />}</div>
            </div>
        </div>

        </>
    )
}