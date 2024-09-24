import Sidebar from "./components/Sidebar";
import DataTableInProgress from "./components/DataTableInProgress";

const InProgressCourses = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-slate-50">
        <DataTableInProgress />
      </main>
    </div>
  );
};

export default InProgressCourses;
