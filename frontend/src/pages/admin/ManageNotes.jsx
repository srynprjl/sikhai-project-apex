import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router";
import api from "../../api";
import { useState, useEffect } from "react";
import DeleteModal from "../../components/modals/DeleteModal";

export default function ManageNotes() {
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [deleteTitle, setDeleteTitle] = useState(null)
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
      setCount(res.data.length)
    }
    getNotes()
  }, [])


  function viewnotes(id){
    navigate(`/notes/${id}`)
  }
function openModal(id, title){
  setModalOpen(true)
  setDeleteId(id)
  setDeleteTitle(title)
}

function closeModal(){
  setModalOpen(false)
  setDeleteId(null)
  setDeleteTitle(null)
}

async function handleDelete(id){
  try{
    await api.delete(`/api/admin/notes/${id}/`)
    alert("Succesfully deleted note")
  } catch (e){
    alert("Failed to delete note")
  }
  navigate(0)
}

  const notesList = notes.map((data) => {
    return data.title.toLowerCase().includes(search.toLowerCase()) && <AdminContainer key={data.id} id={data.id} title={data.title} updateSrc={() => viewnotes(data.id)} deleteSrc={() => openModal(data.id, data.title)}></AdminContainer>
  })


      useEffect(() => {
    setCount(notesList.filter((k) => k).length);
  }, [notesList]);

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="notes" count={count}     onChange={(e) => {
            setSearch(e.target.value);
            // setCount(usersList.length);
          }}>
          {notesList}
        </AdminView>
          <DeleteModal modalOpen={modalOpen} deleteFunc={()=>handleDelete(deleteId)} cancelFunc={closeModal} title={deleteTitle} />
      </DashboardLayout>
    </>
  );
}
