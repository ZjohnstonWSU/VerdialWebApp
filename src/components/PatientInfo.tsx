import { Box, Strong, Text } from "@radix-ui/themes";
import { useDatasetStore } from "../store/useDatasetStore";

const PatientInfo: React.FC = () => {
  const { dataset } = useDatasetStore();
  return (
    <Box>
      <Text size="3" style={{ color: "black" }}>
        <Strong>Patient:</Strong> {dataset?.patient.firstname}{" "}
        {dataset?.patient.lastname} <Strong>Age:</Strong> {dataset?.patient.age}
      </Text>
    </Box>
  );
};

export default PatientInfo;
