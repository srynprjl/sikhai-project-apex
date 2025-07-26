import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardView from '../../components/layouts/DashboardView'
import ClassroomContainer from '../../components/layouts/ClassroomContainer';
import DeleteModal from '../../components/modals/DeleteModal';
import { useNavigate } from 'react-router';

const ClassroomListPage = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [count, setCount] = useState(0);


  const classRoomList = classrooms.map((classroom) => (
    <ClassroomContainer id={classroom.id} name={classroom.name} description={classroom.description} price={classroom.price} subjects={classroom.subjects} isPublic={true}/>
))
  return (
    <DashboardLayout>
    <DashboardView searchFunc={(e) => setSearch(e.target.value)} searchVisible titleVisible firstContainer title="classrooms" count={count}  btnVisible={false}>
          {classRoomList}
    </DashboardView>
    </DashboardLayout>
  );
};

export default ClassroomListPage;
