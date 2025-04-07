import { Strong, Flex, Card } from "@radix-ui/themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
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
    time: Number(
      ((timestamp - dataset.ecgSnapshot.timestamps[0]) / 1000).toFixed(2)
    ),
    value: dataset.ecgSnapshot.values[index],
  }));

  return (
    <Flex justify="center" style={{ height: "45vh", margin: "10px" }}>
      <Card style={{ width: "90vw", padding: "15px" }}>
        <Strong style={{ color: "black" }}>{title}</Strong>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{ value: "Time (sec)", position: "insideBottom", dy: 40 }}
            />
            <YAxis
              label={{
                value: "Voltage (V)",
                angle: -90,
                position: "insideLeft",
                dy: -10,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip
              labelFormatter={(label) => `Time : ${label} sec`}
              formatter={(value) => [`${value} volts`, "Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
            <Brush
              dataKey="time"
              height={20}
              stroke={color}
              travellerWidth={10}
              y={217} // optional manual y-position tweak if it's still tight
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Flex>
  );
};

export default ECGChart;
