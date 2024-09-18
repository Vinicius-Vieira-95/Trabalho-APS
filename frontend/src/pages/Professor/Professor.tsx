
import Sidebar from "./components/Sidebar";
import DataTable from "./components/DataTable";


const Alunos = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 bg-slate-50">
                <DataTable />
            </main>
        </div>
    );
};

export default Alunos;
