import { Box, SegmentedControl, Theme } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { db, doc, getDoc } from "./data/firebase";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import AppHeader from "./components/AppHeader";
import DayView from "./pages/DayView";
import WeekView from "./pages/WeekView";
import { useDatasetStore, Dataset } from "./store/useDatasetStore";
import generateMockWeekData from "./components/generateMockData";

const App = () => {
  const { setDataset } = useDatasetStore();
  const [view, setView] = useState<"day" | "week">("day");
  const { dataset } = useDatasetStore();

  // Function to fetch data from Firestore
  const fetchData = async () => {
    const dataDoc = doc(db, "TestDoc/2025-01-01");
    const snapshot = await getDoc(dataDoc);
    if (snapshot.exists()) {
      console.log("Inside fetch");
      const docData = snapshot.data();
      // Transform Firestore data into our Dataset structure
      const transformedData: Dataset = {
        patient: {
          firstname: docData.patient.firstname || "Unknown",
          lastname: docData.patient.lastname || "Unknown",
          age: docData.patient.age || 0,
        },
        days: docData.days.map((day: any) => ({
          date: day.date,
          spo2: day.spo2 || [],
          respiration: day.respiration || [],
          movement: day.movement || [],
        })),
        ecgSnapshot: {
          timestamps: docData.ecgSnapshot.timestamps || [],
          values: docData.ecgSnapshot.values || [],
        },
      };
      setDataset(transformedData);
    }
  };

  // Auto-fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const loadMockData = () => {
    const mockData = generateMockWeekData();
    setDataset(mockData);
  };

  const downloadData = () => {
    if (dataset) {
      const blob = new Blob([JSON.stringify(dataset, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "dataset.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error("Dataset is empty or undefined.");
    }
  };

  return (
    <Theme>
      <Box overflow="hidden" style={{ height: "100vh" }}>
        <AppHeader
          onFetch={fetchData}
          onDownload={downloadData}
          onMock={loadMockData}
        />
        <ScrollArea.Root
          style={{
            height: "85%",
            width: "100%",
          }}
        >
          <ScrollArea.Viewport
            style={{
              height: "100%",
              width: "100%",
              overflow: "auto", // Enable scrolling
            }}
          >
            <SegmentedControl.Root defaultValue="day">
              <SegmentedControl.Item value="day" onClick={() => setView("day")}>
                Day
              </SegmentedControl.Item>
              <SegmentedControl.Item
                value="week"
                onClick={() => setView("week")}
              >
                Week
              </SegmentedControl.Item>
            </SegmentedControl.Root>
            {view === "day" ? <DayView /> : <WeekView />}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" style={{ width: "5px" }}>
            <ScrollArea.Thumb
              style={{
                background: "#999",
                borderRadius: "5px",
              }}
            />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </Box>
    </Theme>
  );
};

export default App;
