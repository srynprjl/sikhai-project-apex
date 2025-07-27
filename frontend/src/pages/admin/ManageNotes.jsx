import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router";
import api from "../../api";
import { useState, useEffect } from "react";

export default function ManageNotes() {
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
  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="notes" count={count}>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
          <AdminContainer approve></AdminContainer>
        </AdminView>
      </DashboardLayout>
    </>
  );
}
