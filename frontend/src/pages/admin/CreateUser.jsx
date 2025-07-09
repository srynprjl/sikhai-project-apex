import DashboardLayout from "../../components/DashboardLayout";
import CreateUpdateUserForm from "../../components/CreateUpdateUserForm";
export default function CreateUser() {
  return (
    <>
      <DashboardLayout>
        <CreateUpdateUserForm mode="create" apiUrl={`/api/users/`} />
      </DashboardLayout>
    </>
  );
}
