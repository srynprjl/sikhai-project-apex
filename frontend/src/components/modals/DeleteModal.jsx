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
    <Modal isOpen={props.modalOpen} className="absolute top-1/2 left-1/2 right-auto bottom-auto bg-dark-primary w-1/2 text-white p-16 flex flex-col gap-16"  style={customStyles}> 
        <h1 className="text-xl font-bold">Do you want to delete {props.title}</h1>
        <div className="flex justify-end gap-4">
            <button onClick={props.deleteFunc} className="px-4 py-2 flex items-center gap-2 hover:bg-red-400">
                <Check />Confirm
            </button>
            <button onClick={props.cancelFunc} className="px-4 py-2 items-center gap-2 flex hover:bg-accent">
                <X />Cancel
            </button>
        </div>
    
    </Modal>
    )
}
