import { useState, useEffect } from "react";
import NoteContainer from "../../components/layouts/NoteContainer";
import DashboardView from "../../components/layouts/DashboardView";
import Output from "editorjs-react-renderer";
import { useNavigate } from "react-router";
import api from "../../api";
import PaymentModal from "../../components/modals/PaymentModal";
import { jwtDecode } from "jwt-decode";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import DeleteModal from "../../components/modals/DeleteModal";


export default function PublicNoteView() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [notePrice, setPrice] = useState(0.0);
  const [noteId, setNoteId] = useState();
  const [paidNotes, setPaidNotes] = useState([])

  const [modalOpen, setModalOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
    async function fetchData() {
      const { data } = await api.get("/api/notes/all/");
      console.log(data);
      setNotes(data);
    }

    async function userBoughtNotes() {
      const {data} = await api.get("/api/get-purchased-notes/")
      console.log(data);
      setPaidNotes(data)
    }

    fetchData();
    setUser(jwtDecode(localStorage.getItem("access")).user_id);
    userBoughtNotes()
    // fetchUsers();
  }, [])

  function navigatePage(id) {
    return navigate(`/notes/${id}/`);
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

  async function handleDelete(id) {
    await api.delete(`/api/notes/delete/${id}/`);
    navigate(0);
  }

  async function handlePurchase(id, title, price) {
    setNoteId(id);
    setNoteTitle(title);
    setPrice(price);

    if(price > 1){
      setPayModalOpen(true);

    } else if(price==0.00){
      try{
        const res = await api.post('/api/buy-free-notes/', {'note_id': id})
        console.log(res)
        alert("Purchased!")
      } catch (err){
        console.log(err)
      }
    }
  }

  const notesList = notes.map((data, index) => {
    let bought = false;
    if (data.title.toLowerCase().includes(search.toLowerCase())) {
      data.content = {
        ...data.content,
        blocks: data.content.blocks.slice(0, 1),
      };

      paidNotes.forEach((data2) => {   
        console.log(data2) 
        if(data2.note == data.id){
          bought = true;
          return;
        }
      })
      return data.isPublic ? (
        <NoteContainer
          author={data.author}
          id={data.id}
          key={data.id}
          name={data.title}
          onClick={() => navigatePage(data.id)}
          price={data.price}
          bought={bought}
          delete={() => {openModal(data.id, data.title)}}
          handlePurchase={handlePurchase}
          isPublic={true}
        >
          <Output data={data.content} />
        </NoteContainer>
      ) : null;
    } else {
      null;
    }
  });


  return (
    <DashboardLayout>
      <DashboardView searchVisible 
      searchFunc={(e) => setSearch(e.target.value)}
      titleVisible firstContainer title="public notes" count={count} btnVisible={false}>
       <PaymentModal
        modalOpen={payModalOpen}
        id={noteId}
        title={noteTitle}
        price={notePrice}
        modalClose={() => setPayModalOpen(false)}
      ></PaymentModal>
      {notesList}
      
    </DashboardView>
        <DeleteModal modalOpen={modalOpen} deleteFunc={()=>handleDelete(deleteId)} cancelFunc={closeModal} title={deleteTitle} />
    </DashboardLayout>

  );
}
