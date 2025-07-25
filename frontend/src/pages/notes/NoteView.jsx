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
  const [paidNotes, setPaidNotes] = useState([]);
  const [search, setSearch] = useState("");
const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const {data} = await api.get("/api/notes/")
            setNotes(data)
        }

            async function fetchBoughtNotes(){
      const {data} = await api.get("/api/get-purchased-notes/")
      setPaidNotes(data)
    }

        fetchBoughtNotes();
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

    const boughtList = paidNotes.map((data) => {
    return <NoteContainer key={data.id} id={data.note} name={data.note_title} onClick={() => navigatePage(data.note)}>
      <p>Purchased</p>
    </NoteContainer>
  })

  return (
    <DashboardLayout>
    <DashboardView searchFunc={(e) => setSearch(e.target.value)} searchVisible titleVisible firstContainer title="notes" count={count} btnName={"Note"} btnSrc={"/notes/create"} btnVisible={true}>
      {notesList }
      {boughtList}
    </DashboardView>

    <DeleteModal modalOpen={modalOpen} deleteFunc={()=>handleDelete(deleteId)} cancelFunc={closeModal} title={deleteTitle} />
    </DashboardLayout>
  );
}