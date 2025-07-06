import { HomeIcon, CircleCheckBig, Notebook, NotebookPen, Presentation, Pencil, BookCheck, Bolt, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function Sidebar(props){
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)
    return(
        <>
        <div className="flex flex-col fixed left-0 bg-white h-[100vh] justify-between gap-4 p-5 w-16 rounded-xl ">
            <div className="flex flex-col gap-2 items-center">
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => setExpanded(prev => !prev)}><Menu /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/dashboard')}><HomeIcon /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/todos')}><CircleCheckBig /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/notes')}><NotebookPen /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/notes/browse')}><Notebook /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/whiteboard')}><Presentation /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/')}><Pencil /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md" onClick={() => navigate('/tutors')}><BookCheck /></button></span>
            </div>

            <div className="flex flex-col gap-6 items-center">
                <div className="hover:bg-sidebar-items p-2 rounded-md"><Bolt /></div>
                <div className="hover:bg-sidebar-items p-2 rounded-md" onClick={ () => navigate('/logout')}><LogOut /></div>
            </div>
        </div>

        </>
    )
}