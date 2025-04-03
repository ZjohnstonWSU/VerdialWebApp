import { CodeIcon, DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Flex, Button, Heading } from "@radix-ui/themes";
import PatientInfo from "./PatientInfo";

interface AppHeaderProps {
  onFetch: () => void;
  onDownload: () => void;
  onMock: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  onFetch,
  onDownload,
  onMock,
}) => {
  return (
    <Flex
      height="18%"
      direction="column"
      gap="1"
      align="center"
      justify="center"
      style={{
        padding: "15px",
        backgroundColor: "white",
      }}
    >
      <Heading>Patient Monitor Dashboard</Heading>
      <PatientInfo />
      <Flex direction="row" gap="4">
        <Button onClick={onFetch} variant="surface">
          Fetch Data <ReloadIcon />
        </Button>
        <Button onClick={onDownload} variant="surface">
          Download Data <DownloadIcon />
        </Button>
        <Button onClick={onMock} variant="surface">
          Mock Data <CodeIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
