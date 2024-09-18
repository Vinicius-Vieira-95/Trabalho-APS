// AppRouter.tsx  
import {  Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';  
import LoginPage from './pages/Login/LoginPage';  
import AlunosPage from './pages/Alunos/Alunos';
import ProfessorPage from './pages/Professor/Professor'  
import { useAuth } from './hook/useAuth';  
 

const AppRouter: React.FC = () => {  
  const auth = useAuth();   
  
  return (  
    <BrowserRouter>
      <Routes>
        {auth?.isAuthenticated() ? (
          <>
           
            <Route path='/alunos' element={<AlunosPage />} />
          </>
        ) : (
          <>
            <Route path='/' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/professor' element={<ProfessorPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );  
};  

export default AppRouter;