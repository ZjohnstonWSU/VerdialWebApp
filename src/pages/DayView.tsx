import { Flex, Box } from "@radix-ui/themes";
import LineChartComponent from "../components/LineChart";
import ECGChart from "../components/ECGSnapshot";

const DayView = () => {
  return (
    <Flex direction="column" style={{ backgroundColor: "#d9d9d9" }}>
      <ECGChart title="ECG 1-minute Snapshot" color="black" />
      <LineChartComponent title="SpO2 Levels" dataKey="spo2" color="blue" />
      <LineChartComponent
        title="Respiration Rate"
        dataKey="respiration"
        color="green"
      />
      <LineChartComponent title="Movement" dataKey="movement" color="red" />
      <Box height="20px" />
    </Flex>
  );
};

export default DayView;
