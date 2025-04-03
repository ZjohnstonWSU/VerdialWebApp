import { Strong, Flex, Card } from "@radix-ui/themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDatasetStore } from "../store/useDatasetStore";

const ECGChart: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => {
  const { dataset } = useDatasetStore();

  // Ensure ECG data exists
  if (
    !dataset ||
    !dataset.ecgSnapshot ||
    dataset.ecgSnapshot.timestamps.length === 0
  ) {
    return <p>Loading {title}...</p>;
  }

  // Map ECG data into chart format
  const chartData = dataset.ecgSnapshot.timestamps.map((timestamp, index) => ({
    time: new Date(timestamp).toLocaleTimeString(), // Convert timestamp to readable time
    value: dataset.ecgSnapshot.values[index], // Get corresponding ECG value
  }));

  return (
    <Flex justify="center" style={{ height: "30vh", margin: "10px" }}>
      <Card style={{ width: "90vw", padding: "15px" }}>
        <Strong style={{ color: "black" }}>{title} </Strong>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} axisLine={false} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false} // No dots for a smooth ECG waveform
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Flex>
  );
};

export default ECGChart;
