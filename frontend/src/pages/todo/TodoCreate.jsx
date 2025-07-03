export default function TodoCreate() {
  return (
    <> 
    <h1 className="text-center text-2xl font-bold">Create a Todo List</h1>
      <form className="flex flex-col justify-center items-center p-8 gap-7">
        <div className="flex flex-col w-full">
          <label htmlFor="title" className="font-semibold text-xl">Title</label>
          <input type="text" name="title" className="bg-white border-2 border-btn outline-0 p-2"/>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="font-semibold text-xl">Description</label>
          <textarea className="bg-white border-2 border-btn outline-0 p-2" rows={6} name="description" />
        </div>
        <button type="submit" name="submit" className="w-full bg-btn p-2 text-white font-semibold rounded-lg">
          Create
        </button>
      </form>
    </>
  );
}
