import { X } from "lucide-react";
import Modal from "react-modal";
import api from "../../api";
import { useEffect, useState } from "react";

    const customStyles = {
        content: {
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

export default function PaymentModal(props){

  let price = props.price ? props.price : 0.01;
  let platform = 0.01 * price;
  let subtotal = price + platform;
  let vat = 0.13 * subtotal;
  let total = subtotal + vat;

  price = parseFloat(price).toFixed(2);
  platform = parseFloat(platform).toFixed(2);
  subtotal = parseFloat(subtotal).toFixed(2);
  vat = parseFloat(vat).toFixed(2);
  total = parseFloat(total).toFixed(2);

  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      const res = await api.get("/api/user/");
      setUser(res.data);
    }

    getUser();
  }, []);

  async function khaltiPaymentIntialize() {
    const payload = {
      return_url: "http://localhost:5173/payment",
      website_url: "http://localhost:5173/",
      amount: parseInt(total * 100),
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: `${user.username}`,
        email: `${user.email}`,
      },
      // amount_breakdown: [
      //   {
      //     label: "Mark Price",
      //     amount: parseInt(price * 100),
      //   },
      //   {
      //     label: "Platform Charges",
      //     amount: parseInt(platform * 100),
      //   },
      //   {
      //     label: "VAT",
      //     amount: parseInt(vat * 100),
      //   },
      // ],
      product_details: [
        {
          identity: props.id,
          name: `${props.title}`,
          total_price: parseInt(total * 100),
          quantity: 1,
          unit_price: parseInt(total * 100),
        },
      ],
      merchant_username: "Sikhai Inc.",
    };
    
    const { data } = await api.post("/api/khalti-initiate-payment/", payload);
    window.location.href = data.payment_url;

  }

    return(
    <Modal isOpen={props.modalOpen} className="absolute top-1/2 left-1/2 right-auto bottom-auto bg-dark-secondary w-1/2 text-white p-16 flex flex-col gap-16" style={customStyles}> 
  <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold ">Complete your payment</div>
            <div onClick={props.modalClose}>
              <X />
            </div>
          </div>
          <div className="text-xl">{props.title}</div>

          <div className="flex flex-col gap-6 border-2 border-white p-3">
            <div className="flex justify-between">
              Standard Price: <span className="font-bold">{price}</span>
            </div>
            <div className="flex justify-between">
              Platform Charges: <span className="font-bold">{platform}</span>
            </div>
            <div className="flex justify-between">
              Subtotal:<span className="font-bold">{subtotal}</span>
            </div>
            <div className="flex justify-between">
              VAT:<span className="font-bold">{vat}</span>
            </div>

            <div className="flex justify-between border-t-2 border-t-white py-4 ">
              Total: <span className="font-bold">{total}</span>
            </div>
          </div>
        </div>
        <div>
          Choose your payment method:
          <div className="flex gap-4 w-full">
            <button
              className="bg-green-500 px-8 py-4 w-full font-bold text-white rounded-xl"
              disabled
            >
              eSewa
            </button>
            <button
              className="bg-purple-800 px-8 py-4 w-full font-bold text-white rounded-xl"
              onClick={khaltiPaymentIntialize}
            >
              Khalti
              
            </button>
            <button
              className="bg-blue-500 px-8 py-4  w-full font-bold text-white rounded-xl"
              disabled
            >
              Paypal
            </button>
            <button
              className="bg-purple-500 px-8 py-4 w-full font-bold text-white rounded-xl"
              disabled
            >
              Stripe
            </button>
          </div>
        </div>
      </div>
    
    </Modal>
    )
}