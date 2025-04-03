import { Flex, Box } from "@radix-ui/themes";
import WeeklyLineChartComponent from "../components/WeeklyLineChart";

const WeekView = () => {
  return (
    <Flex direction="column" style={{ backgroundColor: "#d9d9d9" }}>
      <WeeklyLineChartComponent
        title="SpO2 Levels"
        dataKey="spo2"
        color="blue"
      />
      <WeeklyLineChartComponent
        title="Respiration Rate"
        dataKey="respiration"
        color="green"
      />
      <WeeklyLineChartComponent
        title="Movement"
        dataKey="movement"
        color="red"
      />
      <Box height="20px" />
    </Flex>
  );
};

export default WeekView;
