import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router";
import api from "../../api";
import { useState, useEffect } from "react";
import DeleteModal from "../../components/modals/DeleteModal";

export default function ViewSuggestions() {
    const [count, setCount] = useState(0)
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [deleteTitle, setDeleteTitle] = useState(null)
    const [feedbacks, setFeedbacks] = useState([]);
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
      const res = await api.get("/api/feedback/");
      setFeedbacks(res.data)
      setCount(res.data.length)
    }
    getFeedbacks()
  }, [])

  function updateFeedbacks(id){
    navigate(`/feedback/${id}`)
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
    await api.delete(`/api/feedback/delete/${id}/`)
    alert("Succesfully deleted feedback")
  } catch (e){
    alert("Failed to delete feedback")
  }
  navigate(0)
}

  const feedbackLists = feedbacks.map((data) => {
    return data.name.toLowerCase().includes(search.toLowerCase()) && <AdminContainer key={data.id} id={data.id} title={data.name} updateSrc={() => updateFeedbacks(data.id)} deleteSrc={() => openModal(data.id, data.name)}           ></AdminContainer>
  })

    useEffect(() => {
    setCount(feedbackLists.filter((k) => k).length);
  }, [feedbackLists]);

  return (
    <>
      <DashboardLayout>
        <AdminView firstContainer searchVisible titleVisible title="feedbacks" count={count} onChange={(e) => {
            setSearch(e.target.value);
          }}>
          {feedbackLists}
        </AdminView>
        <DeleteModal modalOpen={modalOpen} deleteFunc={()=>handleDelete(deleteId)} cancelFunc={closeModal} title={deleteTitle} />
      </DashboardLayout>
    </>
  );
}
