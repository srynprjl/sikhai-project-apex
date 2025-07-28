import DashboardLayout from "../../components/layouts/DashboardLayout";
import CreateUpdateUserForm from "../../components/form/CreateUpdateUserForm";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../../api";
export default function UpdateUser() {
  const params = useParams();
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
        <CreateUpdateUserForm
          mode="update"
          apiUrl={`/api/users/${params.userID}/`}
        />
      </DashboardLayout>
    </>
  );
}
