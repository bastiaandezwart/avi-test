import { useState, useEffect } from 'react';

export function useHash(): string {
  const [hash, setHash] = useState(() => window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return hash;
}

export function navigate(path: string) {
  window.location.hash = path;
}

export type Route =
  | { page: 'home' }
  | { page: 'student-new' }
  | { page: 'student-edit'; studentId: string }
  | { page: 'student-detail'; studentId: string }
  | { page: 'test-level-select'; studentId: string }
  | { page: 'test-screen'; studentId: string; level: string }
  | { page: 'test-result'; resultId: string }
  | { page: 'not-found' };

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, '') || '/';
  const parts = path.split('/').filter(Boolean);

  if (parts.length === 0 || path === '/') return { page: 'home' };

  if (parts[0] === 'student') {
    if (parts[1] === 'new') return { page: 'student-new' };
    if (parts.length >= 2 && parts[2] === 'edit') return { page: 'student-edit', studentId: parts[1] };
    if (parts.length >= 2 && parts[2] === 'test' && parts[3]) {
      return { page: 'test-screen', studentId: parts[1], level: parts[3] };
    }
    if (parts.length >= 2 && parts[2] === 'test') {
      return { page: 'test-level-select', studentId: parts[1] };
    }
    if (parts.length === 2) return { page: 'student-detail', studentId: parts[1] };
  }

  if (parts[0] === 'test' && parts[1] === 'result' && parts[2]) {
    return { page: 'test-result', resultId: parts[2] };
  }

  return { page: 'not-found' };
}
