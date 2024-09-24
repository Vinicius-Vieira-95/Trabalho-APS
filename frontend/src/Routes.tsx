import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import AlunosPage from "./pages/Alunos/Alunos";
import ProfessorPage from "./pages/Professor/Professor";
import { useAuth } from "./hook/useAuth";
import Dashboard from "./pages/Alunos/Dashboard";
import { Role } from "./models/interface";
import InProgressCourses from "./pages/Professor/InProgressCourses";
import ConfirmPresence from "./pages/Alunos/ConfirmPresence";

const AppRouter: React.FC = () => {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/frequencia" element={<ConfirmPresence />} />

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
            {auth.user?.type === Role.STUDENT && (
              <>
                <Route path="/alunos" element={<AlunosPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/alunos" />} />
              </>
            )}
            {auth.user?.type === Role.TEACHER && (
              <>
                <Route path="/em-andamento" element={<InProgressCourses />} />
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
