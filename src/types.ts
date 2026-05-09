
export interface CropData {
  id: string;
  name: string;
  healthScore: number;
  status: 'Healthy' | 'Warning' | 'Disease';
  lastScanned: string;
  moisture: number;
  nitrogen: number;
  temperature: number;
  location: [number, number];
}

export interface ScanResult {
  disease?: string;
  confidence: number;
  recommendations: string[];
  severity: 'Low' | 'Medium' | 'High';
}
