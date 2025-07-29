import { useNavigate } from "react-router"
import { useEffect , useState} from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardBox from "../../components/layouts/DashboardBox"
import api from "../../api";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale 
} from 'chart.js';
import 'chartjs-adapter-date-fns'; 
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../../constants";
import ClassroomContainer from "../../components/layouts/ClassroomContainer";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
);

export default function TutorHub({earnings}){

    const navigate = useNavigate()
    const {user_id} = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
    const [todoCount, setTodoCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);
    const [boughtNoteCount, setBoughtNoteCount] = useState(0);
    const [classesCount, setClassesCount] = useState(0);
    const [myClasses, setMyClasses] = useState([])
    
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        async function getTodoCount(){
            const res = await api.get("/api/todos/");
            setTodoCount(res.data.length)
        }
        
        async function getNoteCount(){
            const res = await api.get("/api/notes/");
            setNoteCount(res.data.length)
        }

        async function getBoughtNotesCount(){
            const res = await api.get("/api/get-purchased-notes/");
            setBoughtNoteCount(res.data.length)
        }

        async function getClassesCount(){
            const {data} = await api.get("/api/classrooms/"); 
            const myClassroom = data.filter((classroom) => {
                return classroom.tutor.id == user_id
            })
            setClassesCount(myClassroom.length)    
            setMyClasses(myClassroom)     
        }




        getTodoCount()
        getNoteCount()
        getBoughtNotesCount()
        getClassesCount()
      }, [])


      let classesList = myClasses.slice(0,3).map((classroom) => {
            return <ClassroomContainer id={classroom.id} name={classroom.name} description={classroom.description} price={classroom.price} />
        }
    )

    const classes = "h-48 bg-dark-primary rounded-md flex justify-center items-center font-black text-2xl text-black hover:border-2 hover:border-black"
    return(<>
                <div className="p-8">
                    
                    <div className="flex flex-col gap-5">
                        <div className="text-2xl">Actions</div>
                        <div className="grid grid-cols-3 gap-4">
                            <DashboardBox count={todoCount} link="/todos">My Todo</DashboardBox>
                            <DashboardBox count={noteCount} link="/notes">My Notes</DashboardBox>
                            <DashboardBox count={boughtNoteCount} link="/notes">Bought Notes</DashboardBox>
                            <DashboardBox count={classesCount} link="/classroom/manage">My Classes</DashboardBox>
                            <DashboardBox link="/feedback/create">Send Feedback</DashboardBox>
                            <DashboardBox count={`Rs. ${earnings.toFixed(2)}`} >Earnings</DashboardBox>
                        </div>

                        <div className="flex justify-between">
                            <div className="text-2xl">My Classes</div>
                            
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {classesList}
                        </div>
                    </div>
                </div>
    </>)
}
