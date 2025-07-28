import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router";
import api from "../../api";
import { useState, useEffect } from "react";

export default function ViewReports() {
    const [count, setCount] = useState(0)
    const [reports, setReports] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
    async function getUserInfo() {
        const res = await api.get("/api/user/");
            if(!res.data.is_superuser){
            navigate("/forbidden")
         }
        }
    getUserInfo();
    async function getFeedbacks() {
      const res = await api.get("/api/report/");
      setReports(res.data)
    }
    getFeedbacks()
  }, [])

  function viewReports(id){
  }

  function deleteReport(id){

  }

  const feedbackLists = reports.map((data) => {
    return <AdminContainer key={data.id} id={data.id} title={data.target_type} updateSrc={() => viewReports(data.id)} deleteSrc={() => deleteReport(data.id)}></AdminContainer>
  })

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="reports" count={0}>
          {feedbackLists}
        </AdminView>
      </DashboardLayout>
    </>
  );
}
