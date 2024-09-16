import DatatableAluno from "./components/DatatableAluno";  
import Sidebar from "./components/Sidebar";  

const Alunos = () => {  
    return (  
        <div className="flex">  
            <Sidebar/>  
            <main className="flex-1 bg-slate-50">   
                <div className="flex items-center justify-center h-screen">  
                   
                    <div className="w-[80rem]">  
                        <DatatableAluno/>  
                    </div>  
                </div>  
            </main>  
        </div>  
    );  
}  

export default Alunos;