import { useHash, parseRoute, navigate } from './hooks/useRouter';
import { useStudents, useResults, useTeachers } from './hooks/useStorage';
import { Student, TestResult, AviLevel, Classification, Teacher, ErrorObservations } from './types';
import { AVI_LEVEL_ORDER } from './data/avi';

import { HomePage } from './pages/HomePage';
import { StudentFormPage } from './pages/StudentFormPage';
import { StudentDetailPage } from './pages/StudentDetailPage';
import { TestLevelSelectPage } from './pages/TestLevelSelectPage';
import { TestScreenPage } from './pages/TestScreenPage';
import { TestResultPage } from './pages/TestResultPage';
import { TeachersPage } from './pages/TeachersPage';
import { TeacherFormPage } from './pages/TeacherFormPage';
import { TeacherDetailPage } from './pages/TeacherDetailPage';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function App() {
  const hash = useHash();
  const route = parseRoute(hash);
  const [students, setStudents] = useStudents();
  const [results, setResults] = useResults();
  const [teachers, setTeachers] = useTeachers();

  const handleSaveStudent = (student: Student) => {
    setStudents(prev => {
      const existing = prev.findIndex(s => s.id === student.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = student;
        return updated;
      }
      return [...prev, student];
    });
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setResults(prev => prev.filter(r => r.studentId !== id));
  };

  const handleSaveResult = (data: {
    studentId: string;
    aviLevel: AviLevel;
    errors: number;
    readingTimeSeconds: number;
    classification: Classification;
    notes?: string;
    observations?: ErrorObservations;
  }): string => {
    const id = generateId();
    const result: TestResult = { id, date: new Date().toISOString(), ...data };
    setResults(prev => [...prev, result]);
    return id;
  };

  const handleDeleteResult = (resultId: string) => {
    setResults(prev => prev.map(r =>
      r.id === resultId ? { ...r, deletedAt: new Date().toISOString() } : r
    ));
  };

  const handleRestoreResult = (resultId: string) => {
    setResults(prev => prev.map(r =>
      r.id === resultId ? { ...r, deletedAt: undefined } : r
    ));
  };

  const handleSaveTeacher = (teacher: Teacher) => {
    setTeachers(prev => {
      const existing = prev.findIndex(t => t.id === teacher.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = teacher;
        return updated;
      }
      return [...prev, teacher];
    });
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    setStudents(prev => prev.map(s => ({
      ...s,
      primaryTeacherId: s.primaryTeacherId === id ? undefined : s.primaryTeacherId,
      additionalTeacherIds: s.additionalTeacherIds?.filter(tid => tid !== id),
    })));
  };

  if (route.page === 'home') {
    return <HomePage students={students} results={results} teachers={teachers} />;
  }

  if (route.page === 'teachers') {
    return <TeachersPage teachers={teachers} students={students} />;
  }

  if (route.page === 'teacher-new') {
    return <TeacherFormPage onSave={handleSaveTeacher} />;
  }

  if (route.page === 'teacher-edit') {
    const teacher = teachers.find(t => t.id === route.teacherId);
    if (!teacher) { navigate('/teachers'); return null; }
    return <TeacherFormPage teacher={teacher} onSave={handleSaveTeacher} />;
  }

  if (route.page === 'teacher-detail') {
    const teacher = teachers.find(t => t.id === route.teacherId);
    if (!teacher) { navigate('/teachers'); return null; }
    return (
      <TeacherDetailPage
        teacher={teacher}
        students={students}
        results={results}
        onDeleteTeacher={handleDeleteTeacher}
      />
    );
  }

  if (route.page === 'student-new') {
    return <StudentFormPage teachers={teachers} onSave={handleSaveStudent} />;
  }

  if (route.page === 'student-edit') {
    const student = students.find(s => s.id === route.studentId);
    if (!student) { navigate('/'); return null; }
    return <StudentFormPage student={student} teachers={teachers} onSave={handleSaveStudent} />;
  }

  if (route.page === 'student-detail') {
    const student = students.find(s => s.id === route.studentId);
    if (!student) { navigate('/'); return null; }
    return (
      <StudentDetailPage
        student={student}
        results={results}
        onDeleteStudent={handleDeleteStudent}
        onDeleteResult={handleDeleteResult}
        onRestoreResult={handleRestoreResult}
      />
    );
  }

  if (route.page === 'test-level-select') {
    const student = students.find(s => s.id === route.studentId);
    if (!student) { navigate('/'); return null; }
    return <TestLevelSelectPage student={student} results={results} />;
  }

  if (route.page === 'test-screen') {
    const student = students.find(s => s.id === route.studentId);
    if (!student) { navigate('/'); return null; }
    if (!AVI_LEVEL_ORDER.includes(route.level as AviLevel)) {
      navigate(`/student/${route.studentId}/test`);
      return null;
    }
    return (
      <TestScreenPage
        student={student}
        level={route.level as AviLevel}
        onSaveResult={handleSaveResult}
      />
    );
  }

  if (route.page === 'test-result') {
    const result = results.find(r => r.id === route.resultId);
    if (!result || result.deletedAt) { navigate('/'); return null; }
    const student = students.find(s => s.id === result.studentId);
    if (!student) { navigate('/'); return null; }
    return (
      <TestResultPage
        result={result}
        student={student}
        onDeleteResult={handleDeleteResult}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-6">
        <h1 className="text-4xl font-black text-gray-300 mb-2">404</h1>
        <p className="text-gray-500 mb-4">Pagina niet gevonden</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">
          Ga naar home
        </button>
      </div>
    </div>
  );
}
