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

interface LineChartProps {
  title: string;
  dataKey: "spo2" | "respiration" | "movement";
  color: string;
}

const LineChartComponent: React.FC<LineChartProps> = ({
  title,
  dataKey,
  color,
}) => {
  const { dataset } = useDatasetStore();

  // Ensure data exists
  if (!dataset || !dataset.days || dataset.days.length === 0) {
    return <p>Loading {title}...</p>;
  }

  // Select the most recent day of data
  const latestDay = dataset.days[dataset.days.length - 1];

  // Map the data from the latest day
  const chartData = latestDay[dataKey].map(
    (entry: { timestamp: number; value: number }) => ({
      time: new Date(entry.timestamp).getHours(), // Convert timestamp to readable time
      value: entry.value,
    })
  );

  // Get min and max values from dataset
  const values = chartData.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Add a buffer to the min and max values (5% of the range)
  const buffer = (maxValue - minValue) * 0.4;
  const adjustedMin = minValue - buffer;

  return (
    <Flex justify="center" style={{ height: "30vh", margin: "10px" }}>
      <Card style={{ width: "90vw", padding: "15px", paddingBottom: "35px" }}>
        <Strong style={{ color: "black" }}>{title} </Strong>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(hour) =>
                `${hour % 12 || 12} ${hour >= 12 ? "PM" : "AM"}`
              }
              label={{
                value: "Time (hours)",
                position: "insideBottom",
                dy: 10,
              }}
            />
            <YAxis
              domain={[adjustedMin, maxValue]}
              label={
                dataKey === "spo2"
                  ? {
                      value: "SpO2 (%)",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }
                  : dataKey === "respiration"
                  ? {
                      value: "Breaths/min",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }
                  : undefined
              }
            />
            <Tooltip
              labelFormatter={(label) =>
                `Time : ${label % 12 || 12} ${label >= 12 ? "PM" : "AM"}`
              }
              formatter={(value) => [
                `${value}${
                  dataKey === "spo2"
                    ? "%"
                    : dataKey === "respiration"
                    ? " breaths/min"
                    : ""
                }`,
                "Value",
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Flex>
  );
};

export default LineChartComponent;
