import Sidebar from "./components/Sidebar";
import DataTableInProgress from "./components/DataTableInProgress";

const InProgressCourses = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-slate-50">
        <div className="flex p-10 justify-center min-h-screen ml-64">
          <div className="w-full overflow-auto">
            <DataTableInProgress />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InProgressCourses;
