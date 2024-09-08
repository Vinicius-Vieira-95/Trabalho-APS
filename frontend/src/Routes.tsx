import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import LoginPage from './pages/Login/LoginPage'
import AlunosPage from './pages/Alunos/Alunos';

const AppRouter = () => {  
  return (  
    <Router>  
      <Routes>  
        <Route path="/" element={<LoginPage />} />  
        <Route path="/alunos" element={<AlunosPage />} /> 
      </Routes>  
    </Router>  
  );  
};  

export default AppRouter;