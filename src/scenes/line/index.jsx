import { Box } from "@mui/material";
import Header from "../../components/Headers";
import LineChart from "../../components/LineChart";
const Line = () => {
  return (
    <Box m="20px">
      <Header title="LINECHART" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};
export default Line;
