import { useState, useEffect } from "react";
import TodoContainer from "./components/TodoContainer";
import DashboardView from "../../components/DashboardView";

import { useNavigate } from "react-router";
import api from "../../api";

export default function NoteView() {
const [count, setCount] = useState(0);
const [todos, setTodos] = useState([]);
const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const {data} = await api.get("/api/todos/")
            console.log(data)
            setTodos(data)
        }

        fetchData()
    }, [])

function navigatePage(id){
  return navigate(`/todos/${id}/`)
}

async function handleDelete(id){
  await api.delete(`/api/todos/delete/${id}/`)
  navigate(0)
}

  const todosList = todos.map((data, index)=> {
      return <TodoContainer id={data.id} key={data.id} name={data.title} onClick={() => navigatePage(data.id)} delete={() => {handleDelete(data.id)}}>
        
      </TodoContainer>
  })

  return (
    <DashboardView searchVisible titleVisible firstContainer title="Your Todos" count={count} btnName={"Todo"} btnSrc={"/todo/create"} btnVisible={true}>
        {todosList}
    </DashboardView>
  );
}