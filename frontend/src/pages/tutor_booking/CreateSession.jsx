import DashboardLayout from '../../components/layouts/DashboardLayout';

const SessionFormPage = () => {


  return (
    <DashboardLayout>
            <div className="p-8 shadow-md">
      <form  className="space-y-4 text-white">
        <div className='flex items-center justify-between mb-6'>
            <h1 className="text-3xl font-bold mb-6">Create New Session</h1>

            <button
            type="submit"
            className="bg-accent text-white px-6 py-2  disabled:opacity-50 transition duration-300"
            >
          Create Session
        </button>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-bold mb-2">
            Session Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
          ></textarea>
        </div>
        <div>
          <label htmlFor="time" className="block  text-sm font-bold mb-2">
            Session Date and Time:
          </label>
          <input
            type="datetime-local"
            id="time"
            name="time"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            required
          />
        </div>
        <div>
          <label htmlFor="google_meet_link" className="block  text-sm font-bold mb-2">
            Google Meet Link (Optional):
          </label>
          <input
            type="url"
            id="google_meet_link"
            name="google_meet_link"
            className="shadow appearance-none bg-dark-secondary rounded w-full py-2 px-3  leading-tight outline-0"
            placeholder="e.g., https://meet.google.com/abc-defg-hij"
          />
        </div>
      </form>
    </div>
    </DashboardLayout>
  );
};

export default SessionFormPage;
