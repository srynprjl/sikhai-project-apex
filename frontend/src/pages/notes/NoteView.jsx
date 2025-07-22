import { useState, useEffect } from "react";
import NoteContainer from "../../components/layouts/NoteContainer";
import DashboardView from "../../components/layouts/DashboardView";
import DeleteModal from "../../components/modals/DeleteModal"
import Output from 'editorjs-react-renderer';
import { useNavigate } from "react-router";
import api from "../../api";
import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function NoteView() {
const [count, setCount] = useState(0);
const [notes, setNotes] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const [deleteId, setDeleteId] = useState(null)
const [deleteTitle, setDeleteTitle] = useState(null)
const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const {data} = await api.get("/api/notes/")
            console.log(data)
            setNotes(data)
        }

        fetchData()
    }, [])

function navigatePage(id){
  return navigate(`/notes/${id}/`)
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
  await api.delete(`/api/notes/delete/${id}/`)
  navigate(0)
}

  const notesList = notes.map((data, index)=> {
    console.log(data.content.blocks.slice(0,2))
    console.log(data.id)
    data.content = {
      ...data.content,
    blocks: data.content.blocks.slice(0, 1) 
    }
      return <NoteContainer id={data.id} key={data.id} name={data.title} onClick={() => navigatePage(data.id)} delete={() => {openModal(data.id, data.title)}}>
        <Output data={ data.content } />
      </NoteContainer>
  })

  return (
    <DashboardLayout>
    <DashboardView searchVisible titleVisible firstContainer title="notes" count={count} btnName={"Note"} btnSrc={"/notes/create"} btnVisible={true}>
        {notesList}
    </DashboardView>

    <DeleteModal modalOpen={modalOpen} deleteFunc={()=>handleDelete(deleteId)} cancelFunc={closeModal} title={deleteTitle} />
    </DashboardLayout>
  );
}
