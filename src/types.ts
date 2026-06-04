export type AviLevel = 'Start' | 'M3' | 'E3' | 'M4' | 'E4' | 'M5' | 'E5' | 'M6' | 'E6' | 'M7' | 'E7' | 'M8' | 'E8' | 'Plus';
export type Classification = 'beheersingsniveau' | 'instructieniveau' | 'frustratieniveau';

export interface Student {
  id: string;
  name: string;
  group?: string;
  birthDate?: string;
  photo?: string;
  createdAt: string;
}

export interface TestResult {
  id: string;
  studentId: string;
  date: string;
  aviLevel: AviLevel;
  errors: number;
  readingTimeSeconds: number;
  classification: Classification;
  notes?: string;
}

export interface AviLevelConfig {
  level: AviLevel;
  label: string;
  wordCount: number;
  goodMaxErrors: number;
  goodMaxSeconds: number;
  sufficientMaxErrors: number;
  sufficientMaxSeconds: number;
  sampleText: string;
  schoolYear: string;
}
