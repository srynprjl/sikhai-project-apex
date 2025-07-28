import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router";
import api from "../../api";
import { useState, useEffect } from "react";

export default function ManageNotes() {
    const [count, setCount] = useState(0)
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
    async function getUserInfo() {
        const res = await api.get("/api/user/");
            if(!res.data.is_superuser){
            navigate("/forbidden")
         }
        }
    getUserInfo();

    async function getNotes() {
      const res = await api.get("/api/notes/all/");
      setNotes(res.data)
    }
    getNotes()
  }, [])


    function viewnotes(id){

  }

  function deleteReport(id){

  }

  const notesList = notes.map((data) => {
    return <AdminContainer key={data.id} id={data.id} title={data.title} updateSrc={() => viewnotes(data.id)} deleteSrc={() => deleteReport(data.id)}></AdminContainer>
  })

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="notes" count={0}>
          {notesList}
        </AdminView>
      </DashboardLayout>
    </>
  );
}
