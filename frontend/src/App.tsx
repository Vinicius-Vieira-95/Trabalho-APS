 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import LoginPage from "./pages/Login/LoginPage";  
import Alunos from './pages/Alunos/Alunos';

function App() {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<LoginPage />} />  
        <Route path='/alunos' element={<Alunos/>}/>
      </Routes>  
    </Router>  
  );  
}  

export default App;