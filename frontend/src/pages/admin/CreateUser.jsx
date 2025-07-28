import DashboardLayout from "../../components/layouts/DashboardLayout";
import CreateUpdateUserForm from "../../components/form/CreateUpdateUserForm";
import api from "../../api";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function CreateUser() {
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
        <CreateUpdateUserForm mode="create" apiUrl={`/api/users/`} />
      </DashboardLayout>
    </>
  );
}
