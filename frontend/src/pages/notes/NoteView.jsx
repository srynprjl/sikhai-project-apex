import { useState, useEffect } from "react";
import NoteContainer from "../../components/NoteContainer";
import DashboardView from "../../components/DashboardView";
// import Blocks from 'editorjs-blocks-react-renderer';
import Output from 'editorjs-react-renderer';

import { useNavigate } from "react-router";
import api from "../../api";

export default function NoteView() {
const [count, setCount] = useState(0);
const [notes, setNotes] = useState([]);
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
      return <NoteContainer id={data.id} key={data.id} name={data.title} onClick={() => navigatePage(data.id)} delete={() => {handleDelete(data.id)}}>
        <Output data={ data.content } />
      </NoteContainer>
  })

  return (
    <DashboardView searchVisible titleVisible firstContainer title="notes" count={count} btnName={"Note"} btnSrc={"/notes/create"} btnVisible={true}>
        {notesList}
    </DashboardView>
  );
}
