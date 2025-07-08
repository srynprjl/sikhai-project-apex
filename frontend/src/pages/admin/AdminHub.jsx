import { useNavigate } from "react-router"
import DashboardLayout from "../../components/DashboardLayout"
import DashboardView from "../../components/DashboardView"
export default function AdminHub(){

    const navigate = useNavigate()

    const classes = "h-48 bg-[#ffedc9] rounded-md flex justify-center items-center font-black text-2xl text-black hover:border-2 hover:border-black"
    return(<>
        <DashboardLayout>
            <DashboardView firstContainer>
                <div className={classes} onClick={() => navigate("/admin/tutors")}>Tutor Applications</div>
                <div className={classes} onClick={() => navigate("/admin/users")}>User Management</div>
                <div className={classes} onClick={() => navigate("/admin/notes")}>Notes Management</div>
                <div className={classes} onClick={() => navigate("/admin/reports/")}>Reports Management</div>
                <div className={classes} onClick={() => navigate("/admin/feedbacks/")}>Feedbacks Management</div>
                <div className={classes} onClick={() => navigate("/admin/roles")}>Roles Management</div>
            </DashboardView>
        </DashboardLayout>
    </>)
}