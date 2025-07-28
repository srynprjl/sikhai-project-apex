import { useNavigate } from "react-router"
import { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AdminBox from "../../components/layouts/AdminBox"
import api from "../../api";
export default function AdminHub(){

    const navigate = useNavigate()
    const [userCount, setUserCount] = useState();
    const [noteCount, setNoteCount] = useState();
    const [reportCount, setReportCount] = useState();
    const [feedbackCount, setFeedbackCount] = useState();
    const [applicationCount, setApplicationCount] = useState();
    const [transcationsCount, setTranscationsCount] = useState();

    useEffect(() => {
        async function getUserInfo() {
            const res = await api.get("/api/user/");
                if(!res.data.is_superuser){
                navigate("/forbidden")
             }
            }
    
        getUserInfo();

        // async function getAllApplications(){
        //     const res = await api.get();
        // }
        async function getAllUserCount(){
            const res = await api.get("/api/users/");
            setUserCount(res.data.length)
        }
        async function getAllNoteCount(){
            const res = await api.get("/api/notes/all/");
            setNoteCount(res.data.length)
        }
        async function getAllReportCount(){
            const res = await api.get("/api/report/");          
            setReportCount(res.data.length)  
        }
        async function getAllFeedbackCount(){
            const res = await api.get("/api/feedback/");          
            setFeedbackCount(res.data.length)         
        }
        async function getAllTransactionsCount(){
            const res = await api.get();             
        }

        // getAllApplications()
        getAllUserCount()
        getAllNoteCount()
        getAllReportCount()
        getAllFeedbackCount()
        // getAllTransactionsCount()
      }, [])

    const classes = "h-48 bg-dark-primary rounded-md flex justify-center items-center font-black text-2xl text-black hover:border-2 hover:border-black"
    return(<>
        <DashboardLayout>
                <div className="p-8 flex gap-4">
                    <div className="flex flex-col gap-5">
                    <div className="text-2xl">Actions</div>
                    <div className="grid grid-cols-3 gap-4">
                        <AdminBox count={applicationCount} link="/admin/tutors">Tutor Applications</AdminBox>
                        <AdminBox count={userCount} link="/admin/users">Users</AdminBox>
                        <AdminBox count={noteCount} link="/admin/notes"> Notes</AdminBox>
                        <AdminBox count={reportCount} link="/admin/reports">Reports</AdminBox>
                        <AdminBox count={feedbackCount} link="/admin/feedbacks">Feedbacks</AdminBox>
                        <AdminBox count={0} >Transactions</AdminBox>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-2xl">Graph</div>
                    </div>
                    <div className="w-full h-full bg-dark-secondary ">
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, quia. Pariatur delectus vitae aliquam harum cumque in totam ea est accusantium? Iure, quos similique suscipit perferendis dolorem recusandae dignissimos explicabo molestias labore?</div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="text-2xl">Activities</div>
                    <div className="bg-dark-secondary h-full w-xs p-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae labore ad. Ea minus, distinctio quia aliquam consectetur nobis cupiditate eos, totam, atque omnis rerum qui corporis recusandae nihil possimus.
                    </div>
                </div>
                </div>
        </DashboardLayout>
    </>)
}
