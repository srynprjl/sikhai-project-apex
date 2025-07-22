import Sidebar from "./Sidebar";
import ProtectedRoute from "./ProtectedRoute";
export default function DashboardLayout(props){
    return(
        <ProtectedRoute>
        <div className="flex flex-col ">
                <Sidebar />
                <div className="w-full h-full text-white font-sans bg-dark-primary">
                    {props.children}
                </div>
        </div>
        </ProtectedRoute>
    )
}
