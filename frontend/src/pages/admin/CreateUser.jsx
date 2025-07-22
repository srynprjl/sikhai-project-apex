import DashboardLayout from "../../components/layouts/DashboardLayout";
import CreateUpdateUserForm from "../../components/form/CreateUpdateUserForm";
export default function CreateUser() {
  return (
    <>
      <DashboardLayout>
        <CreateUpdateUserForm mode="create" apiUrl={`/api/users/`} />
      </DashboardLayout>
    </>
  );
}
