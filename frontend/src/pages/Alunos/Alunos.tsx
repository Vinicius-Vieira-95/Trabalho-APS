
import DatatableAluno from "./components/DatatableAluno";
import Sidebar from "./components/Sidebar";

const Alunos = () => {  
  return (  
    <div className="flex">  
      <Sidebar />  
      <main className="flex-1 bg-slate-50 ml-64">
        <div className="flex p-10 justify-center min-h-screen">
          <div className="w-full overflow-auto"> 
            <DatatableAluno />  
          </div>  
        </div>  
      </main>  
    </div>  
  );  
};

export default Alunos;
