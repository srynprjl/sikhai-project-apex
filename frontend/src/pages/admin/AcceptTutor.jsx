import { useEffect, useState } from "react";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AdminContainer from "../../components/layouts/AdminContainer";
import { useNavigate } from "react-router";
import api from "../../api";

export default function AcceptTutor(){
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
    async function getUserInfo() {
        const res = await api.get("/api/user/");
            if(!res.data.is_superuser){
            navigate("/forbidden")
         }
        }

    getUserInfo();
  }, [])
    return(<><DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="All Tutor Application" count={count}>
            <AdminContainer approve title={"User"}>A</AdminContainer>
            <AdminContainer approve>B</AdminContainer>
            <AdminContainer approve>C</AdminContainer>
            <AdminContainer approve>D</AdminContainer>
            <AdminContainer approve>E</AdminContainer>
            <AdminContainer approve>F</AdminContainer>
        </AdminView>
        </DashboardLayout></>)
}
