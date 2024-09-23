import { Box } from "@mui/material"
import Sidebar from "./components/Sidebar";
import CardDashBoard from "./components/CardDashBoard";


const Dashboard = () => {
    return (
        <Box className="flex">
          <Sidebar />
          <main className="flex-1 bg-slate-50">
           <CardDashBoard/>
          </main>
        </Box>
      );
}
export default Dashboard;