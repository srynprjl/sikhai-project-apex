import { Plus } from "lucide-react";
import { useState } from "react";
import NoteContainer from "../../components/NoteContainer";
import { useNavigate } from "react-router";

export default function NoteView() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  return (
    
    <div className="p-8 flex flex-col gap-3">
            <input type="search"  placeholder="Search..." className="text-xl font-bold outline-0"/>
            
            <hr />
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <h1 className="font-extrabold text-2xl">Your Notes</h1>
          <span className="text-gray-600 text-xl font-bold">({count})</span>
        </div>
        <div>
          <button
            className="flex items-center bg-btn p-2 rounded-4xl text-white font-semibold text-xs"
            onClick={() => navigate("/notes/create")}
          >
            {" "}
            <Plus size={16} />
            Create Note
          </button>
        </div>
      </div>
      <div className="notes-container grid grid-cols-3 gap-6">
        <NoteContainer name="A">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt doloremque pariatur praesentium facilis minus delectus commodi officiis eaque explicabo sunt quae, ratione tenetur laborum tempore vitae voluptas animi sequi dolorum repudiandae aliquid.
        </NoteContainer>
        <NoteContainer name="A">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
        <NoteContainer name="A">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
        <NoteContainer name="A">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
        <NoteContainer name="A">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
      </div>
      
    </div>
  );
}
