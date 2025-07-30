import {
  Bell,
  Menu,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import api from "../../api";
import UserPhoto from "../../assets/test.png";
import DropdownMenu from "../modals/Dropdown";

export default function Sidebar(props) {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTutor, setIsTutor] = useState(false);
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data } = await api.get("/api/user/");
      setIsAdmin(data.is_superuser);
      setIsTutor(data.is_tutor);
      setUserName(data.username);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    }

    fetchData();
  }, []);

  function GetCurrentDate() {
    var date = new Date();
    var time;

    if (date.getHours() >= 5 && date.getHours() < 12) {
      time = "morning";
    } else if (date.getHours() >= 12 && date.getHours() < 17) {
      time = "afternoon";
    } else if (date.getHours() >= 17 && date.getHours() < 21) {
      time = "evening";
    } else {
      time = "night";
    }

    return <span>{useMemo(()=> time, [time])}</span>;
  }

  function NavBarItem(props){
    return <span className="hover:scale-110  p-1 hover:text-gray-200 cursor-pointer" onClick={props.onClick}>{props.children}</span>
  }

  return (
    <>
      <nav className="flex justify-between px-4 py-2 items-center bg-dark-secondary text-white">
        <div className="flex gap-6 items-center">
          <div className="text-2xl font-logo cursor-pointer" onClick={() => navigate("/dashboard")}>SIKHAI</div>
          <div className="navElements flex gap-4 max-md:hidden">
            {!isAdmin && <NavBarItem onClick={() => navigate('/todos')}>Tasks</NavBarItem>}
            {!isAdmin && <NavBarItem onClick={() => navigate('/notes')}>Notes</NavBarItem>}
            {!isAdmin && <NavBarItem onClick={() => navigate('/notes/browse')}>Buy Notes</NavBarItem>}
            {!isAdmin && <NavBarItem onClick={() => navigate('/whiteboard')}>Boards</NavBarItem>}
            {!isAdmin &&  <NavBarItem onClick={() => navigate('/classroom')}>All Classrooms</NavBarItem>}
            {!isAdmin && !isTutor && <NavBarItem onClick={() => navigate('/classroom/booked')}>My Classrooms</NavBarItem>}
            
            {isTutor && <NavBarItem onClick={() => navigate("/classroom/manage")}>My Classrooms</NavBarItem>}
            {isAdmin &&
            <>
            <NavBarItem onClick={() => navigate('/admin/users')}>Manage Users</NavBarItem>
            <NavBarItem onClick={() => navigate('/admin/notes')}>Manage Notes</NavBarItem>
            <NavBarItem onClick={() => navigate('/admin/feedbacks')}>Manage Feedbacks</NavBarItem>
            <NavBarItem onClick={() => navigate('/admin/tutors')}>View Applications</NavBarItem>
            </>
            }


          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div>
          <p className="font-semibold max-lg:hidden">
            Good {<GetCurrentDate />},{" "}
            {firstName != undefined || lastName != undefined
              ? firstName + " " + lastName
              : username}
          </p>
        </div>
        <div className="relative">

        <DropdownMenu trigger={
          <button>
            <img src={UserPhoto} alt="" className="w-8 h-8 rounded-full max-md:hidden" onClick={() => setModalOpen(true)}/>
            <Menu className="max-md:block hidden"/>
          </button>
        }>
        <div className="flex-col max-md:flex hidden">
 {!isAdmin && <NavBarItem onClick={() => navigate('/todos')}>Tasks</NavBarItem>}
            {!isAdmin && <NavBarItem onClick={() => navigate('/notes')}>Notes</NavBarItem>}
            {!isAdmin && <NavBarItem onClick={() => navigate('/notes/browse')}>Buy Notes</NavBarItem>}
            {!isAdmin && <NavBarItem onClick={() => navigate('/whiteboard')}>Boards</NavBarItem>}
            {!isAdmin &&  <NavBarItem onClick={() => navigate('/classroom')}>All Classrooms</NavBarItem>}
            {!isAdmin && !isTutor && <NavBarItem onClick={() => navigate('/classroom/booked')}>My Classrooms</NavBarItem>}
            
            {isTutor && <NavBarItem onClick={() => navigate("/classroom/manage")}>My Classrooms</NavBarItem>}

            {isAdmin &&
            <>
            <NavBarItem onClick={() => navigate('/admin/users')}>Manage Users</NavBarItem>
            <NavBarItem onClick={() => navigate('/admin/notes')}>Manage Notes</NavBarItem>
            <NavBarItem onClick={() => navigate('/admin/feedbacks')}>Manage Feedbacks</NavBarItem>
            <NavBarItem onClick={() => navigate('/admin/tutors')}>View Applications</NavBarItem>
            </>
            }
        </div>
        <hr className="my-2 max-md:block hidden"/>
        <p className="hover:scale-110 p-1 cursor-pointer" onClick={() => navigate('/profiles')}>Profile</p>
        <p className="hover:scale-110 p-1 cursor-pointer" onClick={() => navigate('/logout')}>Logout</p>
      </DropdownMenu>
        </div>
          
        </div>
      </nav>
    </>
  );
}
