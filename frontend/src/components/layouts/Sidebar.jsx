import {
  Bell,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../api";
import UserPhoto from "../../assets/test.png";

export default function Sidebar(props) {
  const navigate = useNavigate();
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

    return <span>{time}</span>;
  }

  function NavBarItem(props){
    return <span className="hover:scale-110 hover:text-gray-200 cursor-pointer" onClick={props.onClick}>{props.children}</span>
  }

  return (
    <>
      <nav className="flex justify-between px-4 py-2 items-center bg-dark-secondary text-white">
        <div className="flex gap-6 items-center">
          <div className="text-2xl font-logo cursor-pointer" onClick={() => navigate("/dashboard")}>SIKHAI</div>
          <div className="navElements flex gap-4 ">
            <NavBarItem onClick={() => navigate('/todos')}>Tasks</NavBarItem>
            <NavBarItem onClick={() => navigate('/notes')}>Notes</NavBarItem>
            <NavBarItem onClick={() => navigate('/notes/browse')}>Buy Notes</NavBarItem>
            <NavBarItem onClick={() => navigate('/whiteboard')}>Boards</NavBarItem>
            <NavBarItem onClick={() => navigate('/whiteboard')}>Book Tutor</NavBarItem>
            <NavBarItem onClick={() => navigate('/whiteboard')}>Examination Center</NavBarItem>
            <NavBarItem onClick={() => navigate('/whiteboard')}>Results</NavBarItem>
            {isTutor ? <NavBarItem onClick={() => navigate('/whiteboard')}>Tutor</NavBarItem>: null}
            {isAdmin ? <NavBarItem onClick={() => navigate('/admin')}>Admin</NavBarItem>: null}
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <div>
          <p className="font-semibold">
            Good {<GetCurrentDate />},{" "}
            {firstName != undefined || lastName != undefined
              ? firstName + " " + lastName
              : username}
          </p>
        </div>
        <MessageCircle size={20} />
        <Bell size={20}/>
          <button>
            <img src={UserPhoto} alt="" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      </nav>
    </>
  );
}
