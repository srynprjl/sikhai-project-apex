export default function Classroom({ isTutor }){
  const [isTutor, setIsTutor] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); 

  return (
    <DashboardLayout>
          <div className="p-8 ">
      <div className="p-8 rounded-lg ">
        <h1 className="text-4xl font-extrabold text-white mb-4">Class Name</h1>
        <p className="text-gray-400 text-lg mb-4">Class Description</p>
        <div className="flex items-center text-gray-300 mb-2">
          <span className="font-semibold text-lg">Subjects:</span>
          <span className="ml-2 text-md">Class Subjects</span>
        </div>
        <div className="flex items-center text-gray-200 font-bold text-2xl mb-6">
          Price: Nrs. 0.00
        </div>
        <p className="text-gray-100 text-md mb-6">Tutor: Tut</p>
        
        {!isTutor && !isEnrolled && (
          <button
            onClick={handleKhaltiPayment}
            className="bg-purple-800 text-white px-8 py-3 text-lg font-semibold hover:bg-purple-700 transition duration-300 mb-6"
          >
            Enroll Now with Khalti (Pay Rs. 0.00)
          </button>
        )}

        {(isTutor || isEnrolled) && (
          <>
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`${activeTab === 'notes' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                >
                  Notes
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`${activeTab === 'files' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                >
                  Files
                </button>
                <button
                  onClick={() => setActiveTab('assignments')}
                  className={`${activeTab === 'assignments' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                >
                  Assignments
                </button>
                <button
                  onClick={() => setActiveTab('sessions')}
                  className={`${activeTab === 'sessions' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`} 
                >
                  Sessions
                </button>
                {isTutor && (
                  <button
                    onClick={() => setActiveTab('students')}
                  className={`${activeTab === 'students' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-md`}
                  >
                    Students
                  </button>
                )}
              </nav>
            </div>
            
            <div className="tab-content mt-6">
              {activeTab === 'notes' && <ClassNotes notes={classroom.notes} />}
              {activeTab === 'files' && <ClassFiles classroomId={id} isTutor={isTutor} />}
              {activeTab === 'assignments' && <ClassAssignments classroomId={id} isTutor={isTutor} />}
              {activeTab === 'sessions' && <Sessions classroomId={id} isTutor={isTutor} />}
              {activeTab === 'students' && isTutor && <Students classroomId={id} />}
            </div>
          </>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
};
