import Sidebar from "./Sidebar";

export default function DashboardLayout(props){
    return(
        <>
        <div className="flex flex-col ">
                <Sidebar />
                <div className="w-full h-full text-white font-sans bg-dark-primary">
                    {props.children}
                </div>
        </div>
        </>
    )
}
