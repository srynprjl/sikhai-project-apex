import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout(props){
    return(
        <>
        <div className="flex">
                <Sidebar />
                <div className="w-full">
                    <TopBar />
                    {props.children}
                </div>
        </div>
        </>
    )
}