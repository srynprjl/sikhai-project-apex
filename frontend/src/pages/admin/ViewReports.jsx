import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
export default function ViewReports(){
    return(<>      
        <DashboardLayout>
                <AdminView firstContainer searchVisible titleVisible title="reports" count={0}>
                  <AdminContainer></AdminContainer>
                  <AdminContainer></AdminContainer>
                  <AdminContainer></AdminContainer>
                  <AdminContainer></AdminContainer>
                  <AdminContainer></AdminContainer>
                  <AdminContainer></AdminContainer>
                  <AdminContainer ></AdminContainer>
                </AdminView>
              </DashboardLayout>
        </>)
}
