export type AviLevel = 'Start' | 'M3' | 'E3' | 'M4' | 'E4' | 'M5' | 'E5' | 'M6' | 'E6' | 'M7' | 'E7' | 'Plus';
export type Classification = 'beheersingsniveau' | 'instructieniveau' | 'frustratieniveau';

export interface ErrorObservations {
  spellingReading?: boolean;
  skippedWords?: boolean;
  mispronunciation?: boolean;
  selfCorrections?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  photo?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  group?: string;
  birthDate?: string;
  photo?: string;
  primaryTeacherId?: string;
  additionalTeacherIds?: string[];
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
  observations?: ErrorObservations;
  deletedAt?: string;
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
