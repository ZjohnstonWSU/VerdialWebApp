import { Flex, Box, Card, Strong, Heading, Text } from "@radix-ui/themes";
import LineChartComponent from "../components/LineChart";
import ECGChart from "../components/ECGSnapshot";
import { useDatasetStore } from "../store/useDatasetStore";

const DayView = () => {
  const { dataset } = useDatasetStore();
  return (
    <Flex direction="column" style={{ backgroundColor: "#d9d9d9" }}>
      {/* Patient Info */}
      <Card
        style={{
          height: "25vh",
          width: "90vw",
          alignSelf: "center",
          margin: "20px",
          padding: "20px",
        }}
      >
        <Flex
          direction="row"
          justify="between"
          align="center"
          style={{ height: "100%", width: "90%" }}
        >
          <Box>
            <Heading>Patient Information</Heading>
            {dataset ? (
              <Flex direction="column" gap="2">
                <Text>
                  <Strong>Last:</Strong> {dataset.patient.lastname}
                </Text>
                <Text>
                  <Strong>First:</Strong> {dataset.patient.firstname}
                </Text>
                <Text>
                  <Strong>Age:</Strong> {dataset.patient.age}
                </Text>
                <Text>
                  <Strong>Last Updated: </Strong>{" "}
                  {dataset.days[dataset.days.length - 1].date}
                </Text>
              </Flex>
            ) : (
              <Text>Loading patient information...</Text>
            )}
          </Box>

          {/* SpO2 Average */}
          <Flex direction="column" align="center" gap="4" justify="between">
            <Heading align={"center"}>
              Average <br /> SpO2 Level
            </Heading>
            {dataset ? (
              (() => {
                const spo2Data = dataset.days[dataset.days.length - 1].spo2;
                const avgSpO2 =
                  spo2Data.reduce((sum, dp) => sum + dp.value, 0) /
                  spo2Data.length;
                return (
                  <Strong>
                    <Text size="7">{avgSpO2.toFixed(1)}</Text>
                  </Strong>
                );
              })()
            ) : (
              <Text>Loading SpO2 data...</Text>
            )}
            <Text size="4" color="gray">
              %
            </Text>
          </Flex>

          {/* Respiration Rate Average */}
          <Flex direction="column" align="center" gap="4" justify="between">
            <Heading align={"center"}>
              Average <br /> Respiration Rate
            </Heading>
            {dataset ? (
              (() => {
                const respData =
                  dataset.days[dataset.days.length - 1].respiration;
                const avgResp =
                  respData.reduce((sum, dp) => sum + dp.value, 0) /
                  respData.length;
                return (
                  <Strong>
                    <Text size="7">{avgResp.toFixed(1)}</Text>
                  </Strong>
                );
              })()
            ) : (
              <Text>Loading respiration data...</Text>
            )}
            <Text size="4" color="gray">
              Breaths/min
            </Text>
          </Flex>
        </Flex>
      </Card>
      <ECGChart title="ECG 10-second Snapshot" color="black" />
      <LineChartComponent title="Movement" dataKey="movement" color="green" />
      <LineChartComponent title="SpO2 Levels" dataKey="spo2" color="red" />
      <LineChartComponent
        title="Respiration Rate"
        dataKey="respiration"
        color="blue"
      />
      <Box height="20px" />
    </Flex>
  );
};

export default DayView;
