import { useState } from "react"
import { Plus } from "lucide-react"
import TodoContainer from "./components/TodoContainer"


import Tasks from "./components/Tasks"
import { useNavigate } from "react-router"
export default function TodoView(){
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    return(
        <div className="p-8 flex flex-col gap-3">
            <input type="search"  placeholder="Search..." className="text-xl font-bold outline-0"/>
            
            <hr />
           <div className="flex justify-between">
             <h1 className="font-bold text-2xl">Your Todos <span className="text-gray-500"> ({count})</span></h1>
            <button className="flex items-center bg-btn p-2 rounded-4xl text-white font-semibold text-xs" onClick={() => navigate("/todos/create")}> <Plus size={16}/>Create Todo</button>
           </div>
           <div className="grid grid-cols-3 gap-6">
            <TodoContainer name="A">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in incidunt ex molestiae vitae, vero quod tempore dolor, iste voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit facere sequi dolores! </TodoContainer>
            <TodoContainer name="B"> 
                <Tasks name="Do Assignments" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nam?" dueDate="now" /> 
                <Tasks name="Do Assignments" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nam?" dueDate="now" /> 
                <Tasks name="Do Assignments" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, nam?" dueDate="now" /> 
            </TodoContainer>
            <TodoContainer name="C"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sit labore, cum facere corporis architecto enim voluptatem sequi libero ipsa? Enim odio consectetur molestias at alias corporis? Velit quas fugiat iure dolorum!</TodoContainer>
            <TodoContainer name="D"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid impedit architecto fugiat ea quae exercitationem sequi totam. Quam nam aperiam vero tempora blanditiis accusantium magnam molestiae incidunt ratione dolorum minima facere, asperiores ex, repudiandae quae. Labore, voluptatibus ipsum. Laboriosam, quasi harum. Iste quod nostrum laborum quis nemo! Cumque itaque architecto, animi voluptatibus adipisci quod eveniet eos autem porro impedit minima voluptate aspernatur, nemo, accusamus fuga corporis perferendis in reprehenderit ullam doloribus qui. Ea similique error culpa quas soluta dicta ipsa perspiciatis, nulla facilis fuga. Ratione cum sequi a velit eaque aut, eligendi beatae voluptas. Quo neque optio ut illo veritatis? </TodoContainer>
            <TodoContainer name="E"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. In delectus corporis minus voluptatibus ratione dolores possimus non ipsam hic a, adipisci mollitia beatae odit molestiae, at numquam ullam totam, ea quae corrupti. </TodoContainer>
           </div>
        </div>
    )



}