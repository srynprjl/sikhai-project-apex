import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import DashboardView from '../../components/layouts/DashboardView';
import ClassroomContainer from '../../components/layouts/ClassroomContainer';

const BookedClassroomsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("")
  
  useEffect(() => {
    async function getAllBookedClasses(){
      const res = await api.get("/api/enrollments/")
      setEnrollments(res.data)
    }
    getAllBookedClasses();
  })

  const classRoomList = enrollments.map((classroom) => (
    classroom.classroom.name.toLowerCase().includes(search.toLowerCase()) && <ClassroomContainer id={classroom.classroom.id} name={classroom.classroom.name} description={classroom.classroom.description} price={classroom.classroom.price} subjects={classroom.classroom.subjects} isPublic={true}/>
))

    useEffect(() => {
      setCount(classRoomList.filter((k) => k).length);
    }, [classRoomList]);

  return (
      <DashboardLayout>
      <DashboardView searchFunc={(e) => setSearch(e.target.value)} searchVisible titleVisible firstContainer title="classrooms" count={count}  btnVisible={false}>
            {classRoomList}
      </DashboardView>
      </DashboardLayout>
  );
};

export default BookedClassroomsPage;
