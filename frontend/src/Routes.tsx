import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AlunosPage from "./pages/Alunos/Alunos";
import ProfessorPage from "./pages/Professor/Professor";
import { useAuth } from "./hook/useAuth";
import Dashboard from "./pages/Alunos/Dashboard";

const AppRouter: React.FC = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        {!auth?.isAuthenticated() && (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Rotas protegidas */}
        {auth?.isAuthenticated() && (
          <>
            {auth.user?.type === 0 && (
              <>
                <Route path="/alunos" element={<AlunosPage />} />
                <Route path="/dasdas" element={<AlunosPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/alunos" />} />
              </>
            )}
            {auth.user?.type === 1 && (
              <>
                <Route path="/professor" element={<ProfessorPage />} />
                <Route path="*" element={<Navigate to="/professor" />} />
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
