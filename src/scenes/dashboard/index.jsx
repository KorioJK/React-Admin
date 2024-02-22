import { Box } from "@mui/material";
import Header from "../../components/Headers";
const Dashboard = () => {
  return (
    <Box m="20px">
      <Box alignItems="center" justifyContent="space-between" display="flex">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"></Header>
      </Box>
    </Box>
  );
};

export default Dashboard;
