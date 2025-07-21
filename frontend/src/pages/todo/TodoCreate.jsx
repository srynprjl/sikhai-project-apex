import { X } from "lucide-react";
import Modal from "react-modal"
const customStyles = {
  content: {
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function TodoCreate(props) {
    // Modal.setAppElement("#modal")
    console.log("hi")
  return (
    <Modal isOpen={props.modalOpen} className="absolute top-1/2 left-1/2 right-auto bottom-auto bg-dark-primary w-1/2 "  style={customStyles}> 
    <div className="flex justify-between items-center p-4">
      <h1 className=" text-2xl font-bold  text-white">Create {props.mode =="task" ? "Task" : "Todo"}</h1>
      <X color="white" onClick={props.modalClose}/>
    </div>
      <form className="flex flex-col justify-center items-center p-4 gap-7">
        <div className="flex flex-col w-full">
          <label htmlFor="title" className="font-semibold text-xl text-white">Title</label>
          <input type="text" name="title" className="bg-dark-secondary outline-0 p-2 text-white"/>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-semibold text-xl text-white">Description</label>
          <textarea className="bg-dark-secondary text-white outline-0 p-2" rows={6} name="description" />
        </div>
        {props.mode == "task" ?         <div className="flex flex-col w-full">
          <label htmlFor="date" className="font-semibold text-xl text-white">Date</label>
          <input type="date" name="date" className="bg-dark-secondary outline-0 p-2 text-white"/>
        </div> : null}
        <button type="submit" name="submit" className="w-full bg-accent p-2 text-white font-semibold rounded-lg">
          Create
        </button>
      </form>
    </Modal>
  );
}
