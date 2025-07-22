import { Navigate } from "react-router"
export default function LogOut(){
    localStorage.clear()
    return <Navigate to="/login" />
    
}
