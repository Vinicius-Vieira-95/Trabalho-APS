
import DatatableAluno from "./components/DatatableAluno";
import Sidebar from "./components/Sidebar";

const Alunos = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-slate-50">
        <div className="flex   p-10 justify-center  h-screen">
          <div className="w-full">
            <DatatableAluno />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Alunos;
