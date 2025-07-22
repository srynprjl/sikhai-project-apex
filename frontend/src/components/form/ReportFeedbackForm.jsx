import { Plus } from "lucide-react"
import { CardHeader } from "../../pages/auth/components/Card"
import { Button, FormLabel, Input, TextArea } from "../../pages/auth/components/Form"
import DashboardLayout from "../layouts/DashboardLayout"

export default function ReportFeedbackForm(props){
    return (
        <DashboardLayout>
        <div className="flex flex-col gap-8 p-8 justify-center self-center">
            <div className="flex justify-between items-center">
                <CardHeader className="text-2xl font-bold">{props.item == "report" ? `Report ${props.user}` : "Feedback to Sikhai"} </CardHeader>
                {props.mode != "view" ? <Button name={`Create ${props.item == "report" ? "Report" : "Feedback"}`} onClick={props.onClick}></Button> : null}
            </div>
            <div className="flex flex-col gap-3 justify-center h-auto">
                <Input type="text" disabled value={props.user}>
                    <FormLabel className="text-xl" >User</FormLabel>
                </Input>
                <TextArea value={props.data} disabled={props.mode === "view" ? true : false}><FormLabel className="text-xl"  >Comment</FormLabel></TextArea>
            </div>

        </div>
    </DashboardLayout>
    )
}
