import NoteContainer from "./components/NoteContainer"
export default function PublicNotesView(){
    return(
        <>
        <div className="flex-col flex gap-3 p-8">
            <input type="search"  placeholder="Search..." className="text-xl font-bold outline-0"/>
            <hr />
    <h1 className="text-2xl font-black">Public Notes</h1>
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
        </>
    )
}