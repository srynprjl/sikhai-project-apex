import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import DashboardLayout from '../../components/layouts/DashboardLayout';

export default function ClassroomCreateUpdateForm(){
  const {id} = useParams();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0.00)
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getClassroomById(id){
      const res = await api.get(`/api/classrooms/${id}/`);
      console.log(res)
      setName(res.data.name)
      setDescription(res.data.description)
      setPrice(res.data.price)
    }

    if(id){
      getClassroomById(id)
    }
  }, [id])

  async function handleSubmit(e){
    e.preventDefault()
    if(id){
      const payload = {
        "name": name,
        "description": description,
        "price": price
      }
      const res = await api.put(`/api/classrooms/${id}/`, payload)

    } else {
      const payload = {
        "name": name,
        "description": description,
        "price": price
      }
      const res = await api.post("/api/classrooms/", payload)
    }
    alert("Classroom successfully " + (id ? "updated" : "created"))
    navigate("/classroom")
  }

  return (
    <DashboardLayout>
    <div className="p-8 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        <div className='flex justify-between items-center mb-6'>
        <h1 className="text-3xl font-bold text-white ">
        {id ? "Update Classroom " : "Create new Classroom"}
      </h1>
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2  disabled:opacity-50 transition duration-300"
        >
        {id ? "Update Classroom " : "Create Classroom"}
        </button>
        </div>
        <div>
          <label htmlFor="name" className="block  text-sm font-bold mb-2">
            Classroom Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 "
            onChange={(e) => {setName(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={description}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 "
            onChange={(e) => {setDescription(e.target.value)}}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-bold mb-2">
            Price (NRs):
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            value={price}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0 " 
            onChange={(e) => {setPrice(e.target.value)}}           
            required
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
    // <></>
  );
};
