import CreateUpdateUserForm from "../../components/form/CreateUpdateUserForm";

export default function UserProfile() {
  return <CreateUpdateUserForm mode="update" apiUrl="/api/user/" />;
}
