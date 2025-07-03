import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout(props){
    return(
        <>
        <div className="flex">
                <Sidebar />
                <div className="w-full h-full ml-16">
                    <TopBar />
                    {props.children}
                </div>
        </div>
        </>
    )
}