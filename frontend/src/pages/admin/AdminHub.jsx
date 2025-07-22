import { useNavigate } from "react-router"
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AdminBox from "../../components/layouts/AdminBox"

export default function AdminHub(){

    const navigate = useNavigate()

    const classes = "h-48 bg-dark-primary rounded-md flex justify-center items-center font-black text-2xl text-black hover:border-2 hover:border-black"
    return(<>
        <DashboardLayout>
                <div className="p-8 flex gap-4">
                    <div className="flex flex-col gap-5">
                    <div className="text-2xl">Actions</div>
                    <div className="grid grid-cols-3 gap-4">
                        <AdminBox count={0} link="/admin/tutors">Tutor Applications</AdminBox>
                        <AdminBox count={0} link="/admin/users">Users</AdminBox>
                        <AdminBox count={0} link="/admin/notes"> Notes</AdminBox>
                        <AdminBox count={0} link="/admin/reports">Reports</AdminBox>
                        <AdminBox count={0} link="/admin/feedbacks">Feedbacks</AdminBox>
                        <AdminBox count={0} >Transactions</AdminBox>
                    </div>

                    <div className="flex justify-between">
                        <div className="text-2xl">Graph</div>
                        <div>
                            <button className="px-6 py-2 bg-dark-secondary">A</button>
                            <button className="px-6 py-2 bg-dark-tertiary">B</button>
                        </div>
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
