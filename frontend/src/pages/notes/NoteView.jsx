import { useState } from "react";
import NoteContainer from "../../components/NoteContainer";
import DashboardView from "../../components/DashboardView";
export default function NoteView() {
const [count, setCount] = useState(0);
const [notes, setNotes] = useState([]);

  return (
    <DashboardView title="Your Notes" count={count} btnName={"Note"} btnSrc={"/notes/create"} btnVisible={true}>
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
    </DashboardView>
  );
}
