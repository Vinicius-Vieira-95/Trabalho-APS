import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import CardDashBoard from "./components/CardDashBoard";

const Dashboard = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <main className="flex-1 bg-slate-50 ml-64">
        <div className="flex p-10 justify-center min-h-screen">
          <div className="w-full overflow-auto">
            <CardDashBoard />
          </div>
        </div>
      </main>
    </Box>
  );
};
export default Dashboard;
