import AdminContainer from "../../components/layouts/AdminContainer";
import AdminView from "../../components/layouts/AdminView";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import api from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ManageUsers() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
      async function getUserInfo() {
        const res = await api.get("/api/user/");
            if(!res.data.is_superuser){
            navigate("/forbidden")
         }
        }
    getUserInfo();
    try {
      async function fetchData() {
        const { data } = await api.get("/api/users/");
        setUsers(data);
        setCount(data.length);
        return;
      }

      fetchData();
    } catch {
      console.error("Failed getting data");
    }
  }, []);

  function updateUser(id) {
    navigate(`/admin/users/update/${id}`);
  }

  async function deleteUser(id) {
    await api.delete(`/api/users/${id}/`);
    navigate(0);
  }

  const usersList = users.map((data, index) => {
    return data.username.includes(search) ? (
      <AdminContainer
        id={index}
        key={data.id}
        title={data.username}
        updateSrc={() => updateUser(data.id)}
        deleteSrc={() => deleteUser(data.id)}
      />
    ) : null;
  });

  return (
    <>
      <DashboardLayout>
        <AdminView
          firstContainer
          btnVisible
          btnName="User"
          btnSrc="/admin/users/create"
          searchVisible
          titleVisible
          title="All Users"
          count={count}
          onChange={(e) => {
            setSearch(e.target.value);
            setCount(usersList.length);
          }}
        >
          {usersList}
        </AdminView>
      </DashboardLayout>
    </>
  );
}
