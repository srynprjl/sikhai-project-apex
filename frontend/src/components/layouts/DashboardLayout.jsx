import Sidebar from "./Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { useMemo } from "react";
export default function DashboardLayout(props){
    const side = useMemo(() => <Sidebar />, [])
    return(
        <ProtectedRoute>
        <div className="flex flex-col ">
                {side}
                <div className="w-full h-full text-white font-sans bg-dark-primary">
                    {props.children}
                </div>
        </div>
        </ProtectedRoute>
    )
}
