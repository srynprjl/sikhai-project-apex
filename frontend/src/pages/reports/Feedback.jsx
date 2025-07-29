import { useEffect, useState } from "react";
import ReportFeedbackForm from "../../components/form/ReportFeedbackForm";
import api from "../../api";
import { useNavigate, useParams } from "react-router";

export default function Feedback(props){
    const [user, setUser] = useState();
    const [username, setUsername] = useState("");
    const [viewUsername, setViewUsername] = useState("");
    const [comment, setComment] = useState("");

    const navigate = useNavigate()
    const {id}= useParams();
    useEffect(() => {
        async function getUserInfo(){
            const {data} = await api.get("/api/user/");
            setUser(data)
            setUsername(data.username)
        }

        async function getDataFromId(){
            const {data} = await api.get(`/api/feedback/${id}/`)
            setViewUsername(data.name.split(" ")[2])
            setComment(data.message)
        }

        getUserInfo();
        getDataFromId();
    }, [])


    async function handleSubmit(user, comment){
        const payload = {
            user: user.id, 
            name: `Feedback from ${user.username}`,
            message: comment
        }

        try{
            console.log(payload)
            const res = api.post("/api/feedback/", payload)
            alert("Submitted feedback")
            navigate("/dashboard")
        } catch (e){
            alert("Failed to submit feedback.")
        }
    }

    return <ReportFeedbackForm mode={props.mode} item="feedback" onClick={handleSubmit} user={user} username={props.mode == 'view' ? viewUsername : username} message={comment}>    

    </ReportFeedbackForm>
}
