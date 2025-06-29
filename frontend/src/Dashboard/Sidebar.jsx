import { HomeIcon, CircleCheckBig, Notebook, NotebookPen, Presentation, Pencil, BookCheck, Bolt, LogOut, Menu } from "lucide-react";



export default function Sidebar(props){
    return(
        <>
        <div className="flex flex-col bg-white h-[100vh] justify-between gap-4 p-5 w-16 rounded-xl ">
            <div className="flex flex-col gap-2 items-center">
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><Menu /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><HomeIcon /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><CircleCheckBig /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><NotebookPen /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><Notebook /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><Presentation /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><Pencil /></button></span>
                <span><button className="hover:bg-sidebar-items p-2 rounded-md"><BookCheck /></button></span>
            </div>

            <div className="flex flex-col gap-6 items-center">
                <div className="hover:bg-sidebar-items p-2 rounded-md"><Bolt /></div>
                <div className="hover:bg-sidebar-items p-2 rounded-md"><LogOut /></div>
            </div>
        </div>

        </>
    )
}