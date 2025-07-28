import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import api from "../../api";
import AdminHub from "../admin/AdminHub";
import TutorHub from "./TutorHub";
import UserHub from "./UserHub";



export default function Dashboard() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTutor, setIsTutor] = useState(false);

    useEffect(() => {
        async function getUserData() {
            try {
                const {data} = await api.get("/api/user/");
                console.log(data)
                setIsAdmin(data.is_superuser);
                setIsTutor(data.is_tutor)
            } catch (e){
                console.log(e)
            }
        } 

        getUserData()
    }, [])

    return <DashboardLayout>
        {
            isAdmin ? <AdminHub /> : (
                isTutor ? <TutorHub /> : <UserHub />
            )
        }
    </DashboardLayout>
}
