import CreateUpdateUserForm from "../../components/form/CreateUpdateUserForm";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function UserProfile() {
  return <DashboardLayout><CreateUpdateUserForm mode="update" apiUrl="/api/user/" self={true} /></DashboardLayout>;
}
