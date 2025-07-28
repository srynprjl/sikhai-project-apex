import { Plus } from "lucide-react"
import { CardHeader } from "../../pages/auth/components/Card"
import { Button, FormLabel, Input, TextArea } from "../../pages/auth/components/Form"
import DashboardLayout from "../layouts/DashboardLayout"
import api from "../../api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"

export default function TutorApplicationForm(props){
    const [userData, setUserData] = useState({
        username: props.user?.username || '', // Use optional chaining
        email: props.user?.email || ''
    });

    const navigate = useNavigate();
    const {id} = useParams();
    const mode = props.mode || 'edit';
    const isViewMode = mode === 'view';
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aboutYou, setAboutYou] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [whyThisRole, setWhyThisRole] = useState('');


    useEffect(() => {
        async function getTutorData(id){
            const {data} = await api.get(`/api/admin/tutor-applications/${id}/`);
            setAboutYou(data.about_you)
            setPhoneNumber(data.phone_number)
            setQualifications(data.qualifications)
            setWhyThisRole(data.why_this_role)
            setUserData({
                username: data.user.username,
                email: data.user.email
            })
        }
        getTutorData(id)
    }, [])



    async function handleSubmit(){
        const payload = {
            phone_number: phoneNumber,
            about_you: aboutYou,
            qualifications: qualifications,
            why_this_role: whyThisRole
        }
        try{
            const res = await api.post("/api/tutor-application/", payload);
            alert("Application submitted succesfully. Please wait");
            navigate("/dashboard")
        } catch (e){
            alert("Failed to submit application")
        }
    }
    return (
        <DashboardLayout>
        <div className="flex flex-col gap-8 p-8 justify-center self-center">
            <div className="flex justify-between items-center">
                <CardHeader className="text-2xl font-bold">Tutor Application</CardHeader>
                {props.mode != 'view' ? <Button name={`Apply for Tutor`} onClick={handleSubmit}></Button> : null}
            </div>

            <div className="flex flex-col gap-3 justify-center h-auto">
                    {isViewMode && <>
                    <Input type="text" disabled value={userData.username}>
                        <FormLabel className="text-xl">User</FormLabel>
                    </Input>

                    <Input type="text" disabled value={userData.email}>
                        <FormLabel className="text-xl">Email</FormLabel>
                    </Input>
                    </>}

                    <Input
                        type="text"
                        disabled={isViewMode}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    >
                        <FormLabel className="text-xl">Phone Number</FormLabel>
                    </Input>

                    <TextArea
                        value={aboutYou}
                        disabled={isViewMode}
                        onChange={(e) => setAboutYou(e.target.value)}
                    >
                        <FormLabel className="text-xl">About you</FormLabel>
                    </TextArea>

                    <TextArea
                        value={qualifications}
                        disabled={isViewMode}
                        onChange={(e) => setQualifications(e.target.value)}
                    >
                        <FormLabel className="text-xl">List all your qualifications</FormLabel>
                    </TextArea>

                    <TextArea
                        value={whyThisRole}
                        disabled={isViewMode}
                        onChange={(e) => setWhyThisRole(e.target.value)}
                    >
                        <FormLabel className="text-xl">Why you want this role</FormLabel>
                    </TextArea>
            </div>

        </div>
    </DashboardLayout>
    )
}
