import { useState } from "react";  
import { useNavigate } from "react-router-dom";   
import { useAuth } from '../../hook/useAuth';  

const LoginPage = () => {  
  const [email, setEmail] = useState('');  
  const [senha, setSenha] = useState('');  
  const [message, setMessage] = useState("");  
  const navigate = useNavigate();  
  const  auth  = useAuth();  

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {  
    setEmail(event.target.value);  
  };  

  const handleSenha = (event: React.ChangeEvent<HTMLInputElement>): void => {  
    setSenha(event.target.value);  
  };    

  function handlelogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (auth?.login(senha)) {
      navigate("/alunos")
      setMessage("")
    }
    setMessage("Error: Email ou senha invalido")
  }

  return (  
    <div className="flex flex-col min-h-screen">   
      <div>  
        <img src="../../img/Topo.png" alt="topo" className="w-full h-[8rem]" />  
      </div>  
      
      <div className="bg-white p-8 mx-auto max-w-[40rem] gap-4 flex flex-col items-center justify-start flex-grow">  
        <img  
          src="../../img/uece-logocompleta.png"  
          alt="Universidade Estadual do Ceará"  
          className="mb-2 w-[20rem] mr-10"  
        />  
        <form className="space-y-4 w-full">  
          <div>  
            <input  
              type="email"  
              id="email"  
              maxLength={39}   
              value={email}   
              onChange={handleEmail}   
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"  
              placeholder="Email"  
            />  
          </div>  
          <div>  
            <input  
              type="password"  
              id="password"  
              maxLength={20}   
              value={senha}   
              onChange={handleSenha}  
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"  
              placeholder="Senha"  
            />  
          </div>  
          <div className="flex justify-center">  
            <button  
              type="submit"  
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"  
              onClick={handlelogin}
            >  
              Login  
            </button>  
          </div>  
          <div className="text-center mt-4">  
             <a href="#" className="text-sm text-gray-600 hover:text-green-600">  
              Esqueceu a senha?  
            </a>   
          </div>  
          {message && (  
            <div className="text-center mt-4 text-red-500">{message}</div>  
          )}  
        </form>  
      </div>  
      
      <div>   
        <img src="../../img/Rodapé.png" alt="" className="w-full h-[6rem]" />  
      </div>  
    </div>  
  );  
};  

export default LoginPage;