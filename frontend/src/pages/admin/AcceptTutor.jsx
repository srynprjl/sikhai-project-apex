import { useEffect, useState } from "react";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AdminContainer from "../../components/layouts/AdminContainer";
import { useNavigate } from "react-router";
import api from "../../api";

export default function AcceptTutor(){
    const [tutors, setTutors] = useState([]);
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState("");
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
            // console.log(res)
            setTutors(res.data)
        }
        getUserInfo();
        getTutors()
  }, [])


  function viewSrc(id) {
    navigate(`/tutors/application/${id}/`)
  }

  async function approve(id) {
    try{
      const res = await api.patch(`/api/admin/tutor-applications/${id}/approve/`)
      console.log(res)
      alert("Succesfully approved tutor")
      navigate(0)
    } catch{
      alert("Failed to approve tutor")
    }
  }

  async function deny(id) {
    
    try{
      await api.delete(`/api/admin/tutor-applications/${id}/delete/`)
      alert("Successfully denied the request")
      navigate(0)
    } catch(e){
      alert("Failed to deny the request")
    }
  }

  const tutorsList = tutors.map((data) => {
    return ("Tutor application of " + data.user.username).toLowerCase().includes(search.toLowerCase()) &&  <AdminContainer tutor approve title={"Tutor application of " + data.user.username} viewSrc={() => viewSrc(data.id)} updateSrc={() => approve(data.id)} deleteSrc={() => deny(data.id)}></AdminContainer>
  })
  
  useEffect(() => {
    setCount(tutorsList.filter((k) => k).length);
  }, [tutorsList]);

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="tutors" count={count}    onChange={(e) => {
            setSearch(e.target.value);
          }}>
          {tutorsList}
        </AdminView>
      </DashboardLayout>
    </>
  );
}
