import AdminContainer from "../../components/AdminContainer";
import AdminView from "../../components/AdminView";
import DashboardLayout from "../../components/DashboardLayout";
export default function ViewReports(){
    return(<>      
        <DashboardLayout>
                <AdminView firstContainer searchVisible titleVisible title="All Tutor Application" count={count}>
                  <AdminContainer ></AdminContainer>
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