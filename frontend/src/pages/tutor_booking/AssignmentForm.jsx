import DashboardLayout from '../../components/layouts/DashboardLayout';

const AssignmentFormPage = () => {
  return (
    <DashboardLayout>
            <div className="p-8 shadow-md">
      <form className="space-y-4 ">
        <div className='flex items-center justify-between  mb-6'>
        <h1 className="text-3xl font-bold text-white">Create New Assignment</h1>
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2  disabled:opacity-50 transition duration-300"
        >
          Create Assignments
        </button>
        </div>
        <div>
          <label htmlFor="title" className="block text-white text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-white text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
          ></textarea>
        </div>
        <div>
          <label htmlFor="deadline" className="block text-white text-sm font-bold mb-2">
            Deadline:
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            required
          />
        </div>
        <div>
          <label htmlFor="assignment_file" className="block text-white text-sm font-bold mb-2">
            Upload Assignment File:
          </label>
          <input
            type="file"
            id="assignment_file"
            name="assignment_file"
            className="block w-full text-sm text-white  cursor-pointer bg-dark-secondary focus:outline-none file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold file:bg-dark-tertiary file:text-white "
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
  );
};

export default AssignmentFormPage;
