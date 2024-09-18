import { Box } from "@mui/material"
import Sidebar from "./components/Sidebar";


const Dashboard = () => {
    return (
        <Box className="flex">
          <Sidebar />
          <main className="flex-1 bg-slate-50">
           Teste
          </main>
        </Box>
      );
}
export default Dashboard;