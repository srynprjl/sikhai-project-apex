import { useEffect, useState } from "react";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AdminContainer from "../../components/layouts/AdminContainer";
import { useNavigate } from "react-router";
import api from "../../api";

export default function AcceptTutor(){
    const [tutors, setTutors] = useState([]);
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        async function getUserInfo() {
            const res = await api.get("/api/user/");
                if(!res.data.is_superuser){
                navigate("/forbidden")
            }
        }
        async function getTutors() {
            const res = await api.get("/api/all-applications/");
            console.log(res)
            setTutors(res.data)
        }
        getUserInfo();
        getTutors()
  }, [])

  const tutorsList = tutors.map((data) => {
    return <AdminContainer approve title={"Tutor application of " + data.user.username}></AdminContainer>

  })

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="tutors" count={0}>
          {tutorsList}
        </AdminView>
      </DashboardLayout>
    </>
  );
}
