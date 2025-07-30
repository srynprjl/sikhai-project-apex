import { Check, X } from "lucide-react";
import Modal from "react-modal"

export default function DeleteModal(props){
    const customStyles = {
        content: {
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return(
    <Modal isOpen={props.modalOpen} className="absolute top-1/2 left-1/2 right-auto bottom-auto bg-dark-primary w-1/2 max-md:w-2/3 max-sm:3/4  text-white p-16 flex flex-col gap-16 max-md:p-24 max-sm:gap-3"  style={customStyles}> 
        <h1 className="text-xl max-md:text-lg font-bold">Do you want to delete {props.title}</h1>
        <div className="flex justify-end gap-4 max-sm:justify-center">
            <button onClick={props.deleteFunc} className="px-4 py-2 flex items-center gap-2 hover:bg-red-400 hover:text-black">
                <Check />Confirm
            </button>
            <button onClick={props.cancelFunc} className="px-4 py-2 items-center gap-2 flex hover:bg-accent hover:text-black">
                <X />Cancel
            </button>
        </div>
    
    </Modal>
    )
}
