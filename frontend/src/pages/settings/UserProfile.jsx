import CreateUpdateUserForm from "../../components/CreateUpdateUserForm";

export default function UserProfile() {
  return <CreateUpdateUserForm mode="update" apiUrl="/api/user/" />;
}
