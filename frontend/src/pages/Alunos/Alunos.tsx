import Sidebar from "./components/Sidebar";  

const Alunos = () => {  
    return (  
        <div className="flex">  
            <Sidebar/>  
            <main className="flex-1"> 
                <h1>Conteúdo principal</h1>  
            </main>  
        </div>  
    );  
}  

export default Alunos;