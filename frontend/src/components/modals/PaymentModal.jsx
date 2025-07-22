import { Check, X } from "lucide-react";
import Modal from "react-modal"

export default function PaymentModal(props){
    const customStyles = {
        content: {
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    let price = props.price ? props.price : 100;
    let platform = 0.01 * price;
    let subtotal = price + platform;
    let vat = 0.13 * subtotal;
    let total = subtotal + vat;

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
