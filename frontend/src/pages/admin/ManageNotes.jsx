import AdminContainer from "../../components/AdminContainer";
import AdminView from "../../components/AdminView";
import DashboardLayout from "../../components/DashboardLayout";

export default function ManageNotes() {
  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="All Tutor Application" count={count}>
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
