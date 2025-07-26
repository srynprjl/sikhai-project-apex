import{ useEffect, useState } from 'react';
import api from '../../api';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardView from '../../components/layouts/DashboardView'
import ClassroomContainer from '../../components/layouts/ClassroomContainer';
import DeleteModal from '../../components/modals/DeleteModal';

export default function ClassroomManage(){
  const [classrooms, setClassrooms] = useState([]);
  const [count, setCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteTitle, setDeleteTitle] = useState(null)

  

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


  const classRoomList = classrooms.map((classroom) => (
    <ClassroomContainer id={classroom.id} name={classroom.name} description={classroom.description} price={classroom.price} subjects={classroom.subjects} handleDelete={() => modalDelete(classroom.id, classroom.name)}/>
))
  return (
    <DashboardLayout>
    <DashboardView searchFunc={(e) => setSearch(e.target.value)} searchVisible titleVisible firstContainer title="classrooms" count={count} btnName={"Classrooms"} btnSrc={"/classroom/manage/new"} btnVisible={true}>
          {classRoomList}
    <DeleteModal modalOpen={modalOpen} deleteFunc={()=>{}} cancelFunc={closeModal} title={deleteTitle} />
    </DashboardView>
    </DashboardLayout>
    
  );
};
