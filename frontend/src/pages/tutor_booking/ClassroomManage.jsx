import{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import api from '../../api';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardView from '../../components/layouts/DashboardView'
import ClassroomContainer from '../../components/layouts/ClassroomContainer';
import DeleteModal from '../../components/modals/DeleteModal';
import { ACCESS_TOKEN } from '../../constants';

export default function ClassroomManage(){
  const [classrooms, setClassrooms] = useState([]);
  const [count, setCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteTitle, setDeleteTitle] = useState(null)
  const {user_id} = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  
  useEffect(() => {
    async function getAllClassrooms(){
      const res = await api.get("/api/classrooms/");
      setClassrooms(res.data)
    }
    getAllClassrooms();
  }, [])

  function modalDelete(id, title){
    setDeleteId(id)
    setDeleteTitle(title)
    setModalOpen(true)
  }

 function closeModal(){
    setDeleteId(null)
    setDeleteTitle(null)
    setModalOpen(false)
}

  const handleDelete = async (id) => {
      try {
        await api.delete(`/api/classrooms/${id}/`);
        setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
        alert('Classroom deleted successfully!');
      } catch (err) {
        console.error('Failed to delete classroom:', err.response ? err.response.data : err.message);
        alert('Failed to delete classroom.');
      }
      navigate(0)
  };


  const classRoomList = classrooms.map((classroom) => (
    classroom.name.toLowerCase().includes(search.toLowerCase()) && (classroom.tutor.id == user_id ) && <ClassroomContainer id={classroom.id} name={classroom.name} description={classroom.description} price={classroom.price} subjects={classroom. subjects} handleDelete={() => modalDelete(classroom.id, classroom.name)}/>)
  )

    useEffect(() => {
      setCount(classRoomList.filter((k) => k).length);
    }, [classRoomList]);

  return (
    <DashboardLayout>
    <DashboardView searchFunc={(e) => setSearch(e.target.value)} searchVisible titleVisible firstContainer title="classrooms" count={count} btnName={"Classrooms"} btnSrc={"/classroom/manage/new"} btnVisible={true}>
          {classRoomList}
    <DeleteModal modalOpen={modalOpen} deleteFunc={()=>{handleDelete(deleteId)}} cancelFunc={closeModal} title={deleteTitle} />
    </DashboardView>
    </DashboardLayout>
    
  );
};
