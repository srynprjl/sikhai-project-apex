import DashboardLayout from "../../components/DashboardLayout";
import CreateUpdateUserForm from "../../components/CreateUpdateUserForm";
import { useParams } from "react-router";
export default function UpdateUser() {
  const params = useParams();
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
