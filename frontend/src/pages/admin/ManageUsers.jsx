import AdminContainer from "../../components/AdminContainer";
import AdminView from "../../components/AdminView";
import DashboardLayout from "../../components/DashboardLayout";
import api from "../../api"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function ManageUsers(){

    const [count, setCount] = useState(0)
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const {data} = await api.get("/api/users/")
            setUsers(data)
            setCount(data.length)
        }

        fetchData()
    }, [])

    function updateUser(){

    }

    async function deleteUser(id){
        const response = await api.delete(`/api/users/${id}/`)
        navigate(0)
    }


    const usersList = users.map((data, index)=> {
            return <AdminContainer id={index} key={data.id} title={data.username} updateSrc="" deleteSrc={() => deleteUser(data.id)} />
    })
    


    return(<>
    <DashboardLayout>
            <AdminView firstContainer searchVisible titleVisible title="All Users" count={count}>
                {usersList}
            </AdminView>
          </DashboardLayout>
    </>
    )
}