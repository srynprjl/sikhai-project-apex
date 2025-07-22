import { useNavigate } from "react-router"
import ProtectedRoute from "../../components/layouts/ProtectedRoute"

export default function PaymentsStatus(props){
    const navigate = useNavigate()
    return <ProtectedRoute>
        <div className="flex flex-col justify-center items-center p-8 gap-10">
            <div className="font-logo text-7xl">SIKHAI</div>
            <div className="flex flex-col ">
                <h1 className="text-3xl font-bold">Your payment has been {"<statusHere>"}</h1>
                <ul className="font-bold text-xl space-y-1 ml-4 mt-2">
                    <li>Transaction ID: </li>
                    <li>Order ID: </li>
                    <li>Product ID: </li>
                    <li>Product Name: </li>
                    <li>Amount </li>
                    <li>Status </li>
                </ul>
            </div>
            <div className="flex items-center gap-4 w-5/12 ">
                <button className="w-full bg-accent px-4 py-2" onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button className="w-full bg-accent px-4 py-2" onClick={() => navigate('/notes/browse')}>Continue Shopping</button>
            </div>
        </div>
    </ProtectedRoute>
}
