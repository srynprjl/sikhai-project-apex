import { useNavigate, useSearchParams } from "react-router"
import ProtectedRoute from "../../components/layouts/ProtectedRoute"
import { useEffect, useState } from "react";
import api from "../../api";

export default function PaymentsStatus(props){
    const searchParams = useSearchParams();
    const [status, setStatus] = useState();
    const [loading, setLoading] = useState(false)
  useEffect(() => {
    
    let payload = {
      pidx: searchParams[0].get("pidx"),
      status: searchParams[0].get("status")
    };
    
    async function getData(payload){
      const res = await api.post("/api/khalti-verify-payment/", payload);
      setStatus(res.data.status)
      setLoading(true)
    }

    getData(payload)
    
  }, []);

    const navigate = useNavigate()
    return <ProtectedRoute>
        <div className="flex flex-col text-white justify-center items-center p-8 gap-10">
            <div className="font-logo text-7xl">SIKHAI</div>
            <div className="flex flex-col ">
                {loading && <h1 className="text-3xl font-bold">Payment completed.</h1>}
                <ul className="font-bold text-xl space-y-1 ml-4 mt-2">
                    <li>Transaction ID: {searchParams[0].get("tidx")}</li>
                    <li>Order ID: {searchParams[0].get("purchase_order_id")}</li>
                    <li>Product ID: {searchParams[0].get("purchase_order_id")}</li>
                    <li>Product Name: {searchParams[0].get("purchase_order_name")}</li>
                    <li>Amount: {searchParams[0].get("amount") / 100} </li>
                    <li>Status: {searchParams[0].get("status")} </li>
                </ul>
            </div>
            <div className="flex items-center gap-4 w-5/12 ">
                <button className="w-full bg-accent px-4 text-black py-2" onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button className="w-full bg-accent px-4 text-black py-2" onClick={() => navigate('/notes/browse')}>Continue Shopping</button>
            </div>
        </div>
    </ProtectedRoute>
}
