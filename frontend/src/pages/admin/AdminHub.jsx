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

export default function AdminHub(){

    const navigate = useNavigate()
    const [userCount, setUserCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [applicationCount, setApplicationCount] = useState(0);
    const [transcationsCount, setTranscationsCount] = useState(0.00);
    
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        async function getUserInfo() {
            const res = await api.get("/api/user/");
                if(!res.data.is_superuser){
                navigate("/forbidden")
             }
            }
    
        getUserInfo();


        async function getAllUserCount(){
            const res = await api.get("/api/users/");
            setUserCount(res.data.length)
        }
        
        async function getAllNoteCount(){
            const res = await api.get("/api/notes/all/");
            setNoteCount(res.data.length)
        }

        async function getAllApplications(){
            const res = await api.get("/api/all-applications/");
            setApplicationCount(res.data.length)
        }

        async function getAllFeedbackCount(){
            const res = await api.get("/api/feedback/");          
            setFeedbackCount(res.data.length)         
        }
        async function getAllTransactionsCount(){
            const {data} = await api.get("/api/payments/total/"); 
            setTranscationsCount(data.total_amount_paid)         
        }

        async function getDailyPayments(){
            const {data} = await api.get("/api/payments/daily/"); 
            const labels = data.map(item => item.date); // Dates for X-axis
            const amounts = data.map(item => parseFloat(item.total_amount)); 
            setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Amount Paid', 
                            data: amounts,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                            tension: 1,
                            fill: true 
                        }
                    ]
                })
        }

        getAllApplications()
        getAllUserCount()
        getAllNoteCount()
        getAllFeedbackCount()
        getAllTransactionsCount()
        getDailyPayments()
      }, [])

          const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Payments',
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', 
                    tooltipFormat: 'yyyy-MM-dd', 
                    displayFormats: {
                        day: 'MMM d, yyyy'
                    }
                }
            },
            y: {
                beginAtZero: true,
            }
        }
    };

    const classes = "h-48 bg-dark-primary rounded-md flex justify-center items-center font-black text-2xl text-black hover:border-2 hover:border-black"
    return(<>
                <div className="p-8">
                    <div className="flex flex-col gap-5">
                        <div className="text-2xl">Actions</div>
                        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                            <DashboardBox count={applicationCount} link="/admin/tutors">Tutor Applications</DashboardBox>
                            <DashboardBox count={userCount} link="/admin/users">Users</DashboardBox>
                            <DashboardBox count={noteCount} link="/admin/notes"> Notes</DashboardBox>
                            <DashboardBox count={feedbackCount} link="/admin/feedbacks">Feedbacks</DashboardBox>
                            <DashboardBox count={transcationsCount} >Transactions</DashboardBox>
                        </div>

                        <div className="flex justify-between">
                            <div className="text-2xl">Graph</div>
                        </div>
                        <div className="w-full h-full bg-dark-secondary ">
                            <Bar data={chartData} options={options} />
                        </div>
                    </div>
                </div>
    </>)
}
