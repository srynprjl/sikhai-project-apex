import DashboardLayout from "../../components/layouts/DashboardLayout";
import CreateUpdateUserForm from "../../components/form/CreateUpdateUserForm";
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
