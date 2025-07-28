import { useState, useEffect } from "react";
import { useParams } from "react-router";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import api from "../../api";

import ClassAssignments from "./tabs/ClassAssignments";
import ClassFiles from "./tabs/ClassFiles";
import Sessions from "./tabs/Sessions";
import Students from "./tabs/Students"
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../constants";


export default function Classroom({  }){
  
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.00)
  const [tutor, setTutor] = useState(0)
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isTutor, setIsTutor] = useState(false)
  const [activeTab, setActiveTab] = useState('files'); 
  const user = jwtDecode(localStorage.getItem(ACCESS_TOKEN))

  useEffect(() => {
    async function  checkIsEnrolled(){
      const res = await api.get(`/api/classrooms/${id}/check-enrollment/`)
      setIsEnrolled(res.data.enrolled)
    }
    async function getClassroomInfo(){
      const res = await api.get(`/api/classrooms/${id}/`);
      setTitle(res.data.name)
      setDescription(res.data.description)
      setPrice(res.data.price);
      setTutor(res.data.tutor.username)

      if(res.data.tutor.id == user.user_id){
        setIsTutor(true)
      }
      console.log(res.data)
    }
    
    getClassroomInfo()
    checkIsEnrolled()
  }, [id])

  function handleKhaltiPayment(){
    
  }

  return (
    <DashboardLayout>
          <div className="p-8 ">
      <div className="p-8 rounded-lg ">
        <h1 className="text-4xl font-extrabold text-white mb-4">{title}</h1>
        <p className="text-gray-400 text-lg mb-4">{description}</p>
        <div className="flex items-center text-gray-200 font-bold text-2xl mb-6">
          Price: Nrs. {price}
        </div>
        <p className="text-gray-100 text-md mb-6">Tutor: {tutor}</p>
        
        {!isTutor && !isEnrolled && (
          <button
            onClick={handleKhaltiPayment}
            className="bg-purple-800 text-white px-8 py-3 text-lg font-semibold hover:bg-purple-700 transition duration-300 mb-6"
          >
            Enroll Now with Khalti (Pay Rs. {price})
          </button>
        )}

        {(isTutor || isEnrolled) && (
          <>
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('files')}
                  className={`${activeTab === 'files' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                >
                  Files
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`${activeTab === 'assignments' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                >
                  Assignments
                </button>
                <button
                  onClick={() => setActiveTab('sessions')}
                  className={`${activeTab === 'sessions' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`} 
                >
                  Sessions
                </button>
                {isTutor && (
                  <button
                    onClick={() => setActiveTab('students')}
                  className={`${activeTab === 'students' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                  >
                    Students
                  </button>
                )}
              </nav>
            </div>
            
            <div className="tab-content mt-6">
              
              {activeTab === 'files' && <ClassFiles classroomId={id} isTutor={isTutor} />}
              {activeTab === 'assignments' && <ClassAssignments classroomId={id} isTutor={isTutor} />}
              {activeTab === 'sessions' && <Sessions classroomId={id} isTutor={isTutor} />}
              {activeTab === 'students' && isTutor && <Students classroomId={id} />} 
              
            </div>
          </>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};
