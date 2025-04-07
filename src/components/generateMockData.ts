import { Dataset } from "../store/useDatasetStore";

const generateMockWeekData = (): Dataset => {
  const startDate = new Date(); // Today
  const days = [];

  for (let i = 0; i < 7; i++) {
    // Create a new day
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() - i); // Go back one day at a time

    const spo2 = [];
    const respiration = [];
    const movement = [];

    for (let j = 0; j < 144; j++) {
      const timestamp = new Date(currentDate);
      timestamp.setMinutes(j * 10); // Every 10 minutes

      spo2.push({
        timestamp: timestamp.getTime(),
        value: Math.floor(Math.random() * 6) + 95,
      });
      respiration.push({
        timestamp: timestamp.getTime(),
        value: Math.floor(Math.random() * 9) + 12,
      });
      movement.push({
        timestamp: timestamp.getTime(),
        value: Math.floor(Math.random() * 6),
      });
    }

    days.push({
      date: currentDate.toISOString().split("T")[0], // Format YYYY-MM-DD
      spo2,
      respiration,
      movement,
    });
  }

  // ECG Snapshot (Large set of timestamp-value pairs over 10 seconds)
  const ecgSnapshot = {
    timestamps: Array.from(
      { length: 1000 },
      (_, i) => Date.now() - (999 - i) * 10
    ), // Every 10ms
    values: Array.from({ length: 1000 }, (_, i) => {
      const t = (i % 200) / 200; // Simulate a heartbeat every 2 seconds (200 samples)
      const spike = Math.exp(-Math.pow((t - 0.5) * 10, 2)); // Gaussian-like spike
      return parseFloat((0.7 + 0.5 * spike + Math.random() * 0.05).toFixed(2)); // Baseline + spike + noise
    }),
  };

  return {
    patient: {
      firstname: "John",
      lastname: "Doe",
      age: 32,
    },
    days,
    ecgSnapshot,
  };
};

export default generateMockWeekData;
