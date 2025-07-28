import { X } from "lucide-react";
import Modal from "react-modal"
import api from "../../api";
import { useEffect , useState} from "react";
import { useNavigate } from "react-router";

const customStyles = {
  content: {
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function TodoCreate(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate=useNavigate()
  const [date, setDate] = useState(0);
  const id=props.taskId;


  useEffect(() => {
    if(props.mode == "task"){
    async function getTasksDetails(id) {
        const res = await api.get(`/api/tasks/${id}/`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setDate(res.data.date)
        console.log(res.data);
    }
      if (props.type != "create") {
        getTasksDetails(props.id);
      }
    } 
    else {
      async function getTodoDetails(id) {
        const res = await api.get(`/api/todos/${id}/`);
        setTitle(res.data.title);
        setDescription(res.data.description);
      }
      if (props.type != "create") {
        getTodoDetails(props.id);
      }
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(props.mode == "task"){
      try {
        if (props.type == "create") {
          const res = await api.post("/api/tasks/", {
            todo: id,
            title,
            description,
            date,
          });
        } else {
        const res = await api.patch(`/api/tasks/${id}/`, {
          title,
          description,
          date,
        });
      }
      alert(
        `Task ${props.type == "create" ? "created" : "updated"} successfully!`
      );

    } catch (error) {
      console.log(error)
      alert(`Failed to ${props.type == "create" ? "create" : "update"}  task.`);
    }

    } else {
    try {
      if (props.type == "create") {    
        const res = await api.post("/api/todos/", {
          title,
          description,
        });
        

      } else {
        const res = await api.patch(`/api/todos/${id}/`, {
          title,
          description,
        });
      }

      alert(
        `Todo ${props.type == "create" ? "created" : "updated"} successfully!`
      );
    } catch (error) {
      console.log(error)
      alert(`Failed to ${props.type == "create" ? "create" : "update"}  todo.`);
    }
    }

    props.modalClose();
    navigate(0);
  };


  return (
    <Modal isOpen={props.modalOpen} className="absolute top-1/2 left-1/2 right-auto bottom-auto bg-dark-primary w-1/2 "  style={customStyles}> 
    <div className="flex justify-between items-center p-4">
      <h1 className=" text-2xl font-bold  text-white">Create {props.mode === "task" ? "Task" : "Todo"}</h1>
      <X color="white" onClick={props.modalClose}/>
    </div>
      <form className="flex flex-col justify-center items-center p-4 gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <label htmlFor="title" className="font-semibold text-xl text-white">Title</label>
          <input type="text" name="title" className="bg-dark-secondary outline-0 p-2 text-white" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-semibold text-xl text-white">Description</label>
          <textarea className="bg-dark-secondary text-white outline-0 p-2" rows={6} name="description" onChange={(e) => setDescription(e.target.value)} />
        </div>
        {props.mode == "task" ? <div className="flex flex-col w-full">
          <label htmlFor="date" className="font-semibold text-xl text-white">Date</label>
          <input type="date" name="date" className="bg-dark-secondary outline-0 p-2 text-white" onChange={(e) => setDate(e.target.value)} />
        </div> : null}
        <button type="submit" name="submit" className="w-full bg-accent p-2 text-white font-semibold rounded-lg">
          Create
        </button>
      </form>
    </Modal>
  );
}
