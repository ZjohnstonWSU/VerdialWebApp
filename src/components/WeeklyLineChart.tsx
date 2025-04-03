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

const WeeklyLineChartComponent: React.FC<LineChartProps> = ({
  title,
  dataKey,
  color,
}) => {
  const { dataset } = useDatasetStore();

  if (!dataset || !dataset.days || dataset.days.length === 0) {
    return <p>Loading {title}...</p>;
  }

  // Get the last 7 days of data
  const recentDays = dataset.days.slice(-7);

  // Map data to a weekly format
  const chartData = recentDays.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }), // Format as "Mon", "Tue", etc.
    value:
      day[dataKey].reduce((sum, entry) => sum + entry.value, 0) /
        day[dataKey].length || 0, // Average value per day
  }));

  // Find min & max for Y-axis scaling
  const values = chartData.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const buffer = (maxValue - minValue) * 0.1;
  const adjustedMin = minValue - buffer;

  return (
    <Flex justify="center" style={{ height: "30vh", margin: "10px" }}>
      <Card style={{ width: "90vw", padding: "15px" }}>
        <Strong style={{ color: "black" }}>{title}</Strong>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[Math.floor(adjustedMin), Math.ceil(maxValue)]} />
            <Tooltip />
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

export default WeeklyLineChartComponent;
