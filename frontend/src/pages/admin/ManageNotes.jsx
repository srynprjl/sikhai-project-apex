import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function ManageNotes() {
  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="notes" count={0}>
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
