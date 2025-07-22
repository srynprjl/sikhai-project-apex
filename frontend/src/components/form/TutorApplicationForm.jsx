import { Plus } from "lucide-react"
import { CardHeader } from "../../pages/auth/components/Card"
import { Button, FormLabel, Input, TextArea } from "../../pages/auth/components/Form"
import DashboardLayout from "../layouts/DashboardLayout"

export default function TutorApplicationForm(props){
    return (
        <DashboardLayout>
        <div className="flex flex-col gap-8 p-8 justify-center self-center">
            <div className="flex justify-between items-center">
                <CardHeader className="text-2xl font-bold">Tutor Application</CardHeader>
                {props.mode != 'view' ? <Button name={`Apply for Tutor`} ></Button> : null}
            </div>

            <div className="flex flex-col gap-3 justify-center h-auto">
                <Input type="text" disabled value={props.user}>
                    <FormLabel className="text-xl">User</FormLabel>
                </Input>

                <Input type="text" disabled value={props.user}>
                    <FormLabel className="text-xl">Email</FormLabel>
                </Input>

                <Input type="text" disabled={props.mode === "view" ? true : false} value={props.user}>
                    <FormLabel className="text-xl">Phone Number</FormLabel>
                </Input>

                <TextArea value={props.data} disabled={props.mode === "view" ? true : false}><FormLabel className="text-xl">About you</FormLabel></TextArea>

                <TextArea value={props.data} disabled={props.mode === "view" ? true : false}><FormLabel className="text-xl">List all your qualifications</FormLabel></TextArea>

                <TextArea value={props.data} disabled={props.mode === "view" ? true : false}><FormLabel className="text-xl">Why you want this role</FormLabel></TextArea>
            </div>

        </div>
    </DashboardLayout>
    )
}
