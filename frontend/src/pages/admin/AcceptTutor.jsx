import { useState } from "react";
import AdminView from "../../components/AdminView";
import DashboardLayout from "../../components/DashboardLayout";
import AdminContainer from "../../components/AdminContainer";

export default function AcceptTutor(){
    const [count, setCount] = useState(0)
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