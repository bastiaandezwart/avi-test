import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

export function useStudents() {
  return useLocalStorage<import('../types').Student[]>('avi_students', []);
}

export function useResults() {
  return useLocalStorage<import('../types').TestResult[]>('avi_results', []);
}

export function useTeachers() {
  return useLocalStorage<import('../types').Teacher[]>('avi_teachers', []);
}
