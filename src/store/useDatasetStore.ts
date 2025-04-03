import { create } from "zustand";

interface PatientInfo {
  firstname: string;
  lastname: string;
  age: number;
}

interface DataPoint {
  timestamp: number;
  value: number;
}

interface DayData {
  date: string;
  spo2: DataPoint[];
  respiration: DataPoint[];
  movement: DataPoint[];
}

interface ECGSnapshot {
  timestamps: number[];
  values: number[];
}

export interface Dataset {
  patient: PatientInfo;
  days: DayData[];
  ecgSnapshot: ECGSnapshot;
}

interface DatasetState {
  dataset: Dataset | null;
  setDataset: (newData: Dataset) => void;
}

export const useDatasetStore = create<DatasetState>((set) => ({
  dataset: null,
  setDataset: (newData) => set({ dataset: newData }),
}));
