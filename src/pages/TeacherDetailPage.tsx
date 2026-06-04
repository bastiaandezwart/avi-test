import { useState } from 'react';
import { Teacher, Student, TestResult } from '../types';
import { navigate } from '../hooks/useRouter';
import { Avatar } from '../components/Avatar';
import { ClassificationBadge } from '../components/ClassificationBadge';

interface TeacherDetailPageProps {
  teacher: Teacher;
  students: Student[];
  results: TestResult[];
  onDeleteTeacher: (id: string) => void;
}

export function TeacherDetailPage({ teacher, students, results, onDeleteTeacher }: TeacherDetailPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const primaryStudents = students
    .filter(s => s.primaryTeacherId === teacher.id)
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'));

  const additionalStudents = students
    .filter(s => s.additionalTeacherIds?.includes(teacher.id) && s.primaryTeacherId !== teacher.id)
    .sort((a, b) => a.name.localeCompare(b.name, 'nl'));

  const getLastResult = (studentId: string): TestResult | undefined =>
    results
      .filter(r => r.studentId === studentId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const handleDelete = () => {
    onDeleteTeacher(teacher.id);
    navigate('/teachers');
  };

  const totalCount = primaryStudents.length + additionalStudents.length;

  function StudentRow({ student }: { student: Student }) {
    const last = getLastResult(student.id);
    return (
      <button
        onClick={() => navigate(`/student/${student.id}`)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
      >
        <Avatar name={student.name} photo={student.photo} size="sm" variant="student" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">{student.name}</p>
          {student.group && <p className="text-xs text-gray-500">{student.group}</p>}
        </div>
        <div className="text-right shrink-0">
          {last ? (
            <>
              <p className="text-sm font-semibold text-gray-700">{last.aviLevel}</p>
              <div className="mt-0.5">
                <ClassificationBadge classification={last.classification} size="sm" />
              </div>
            </>
          ) : (
            <p className="text-xs text-gray-400 italic">Geen toetsen</p>
          )}
        </div>
        <svg className="w-4 h-4 text-gray-300 shrink-0 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex items-center gap-3">
        <button
          onClick={() => navigate('/teachers')}
          className="p-1 -ml-1 rounded-lg active:bg-blue-500"
          aria-label="Terug"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <Avatar name={teacher.name} photo={teacher.photo} size="md" variant="teacher" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold truncate">{teacher.name}</h1>
          <p className="text-blue-100 text-sm">{totalCount} leerling{totalCount !== 1 ? 'en' : ''}</p>
        </div>
        <button
          onClick={() => navigate(`/teacher/${teacher.id}/edit`)}
          className="p-2 rounded-lg active:bg-blue-500"
          aria-label="Bewerken"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </header>

      <div className="px-4 py-4 space-y-4">
        {primaryStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Verantwoordelijk voor ({primaryStudents.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {primaryStudents.map(s => <StudentRow key={s.id} student={s} />)}
            </div>
          </div>
        )}

        {additionalStudents.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Aanvullend betrokken ({additionalStudents.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {additionalStudents.map(s => <StudentRow key={s.id} student={s} />)}
            </div>
          </div>
        )}

        {totalCount === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-400">
            <p>Nog geen leerlingen gekoppeld</p>
            <button
              onClick={() => navigate('/student/new')}
              className="mt-3 text-blue-600 text-sm font-medium"
            >
              Leerling toevoegen
            </button>
          </div>
        )}

        <div className="pt-4">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full border border-red-300 text-red-600 font-medium py-3 px-6 rounded-xl text-base active:bg-red-50 transition-colors min-h-[48px]"
            >
              Leraar verwijderen
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
              <p className="text-red-800 font-medium text-center">
                Weet je zeker dat je <strong>{teacher.name}</strong> wilt verwijderen?
                {totalCount > 0 && (
                  <span className="block text-sm font-normal mt-1 text-red-700">
                    De gekoppelde leerlingen blijven behouden.
                  </span>
                )}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl active:bg-gray-50 min-h-[48px]"
                >
                  Annuleren
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-xl active:bg-red-700 min-h-[48px]"
                >
                  Ja, verwijderen
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
