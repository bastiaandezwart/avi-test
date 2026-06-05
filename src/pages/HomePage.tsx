import { Student, TestResult, Teacher } from '../types';
import { navigate } from '../hooks/useRouter';
import { BottomNav } from '../components/BottomNav';
import { ClassificationBadge } from '../components/ClassificationBadge';
import { Avatar } from '../components/Avatar';

interface HomePageProps {
  students: Student[];
  results: TestResult[];
  teachers: Teacher[];
}

function getLastResult(results: TestResult[], studentId: string): TestResult | undefined {
  return results
    .filter(r => r.studentId === studentId && !r.deletedAt)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
}

function StudentCard({ student, results }: { student: Student; results: TestResult[] }) {
  const lastResult = getLastResult(results, student.id);
  return (
    <button
      onClick={() => navigate(`/student/${student.id}`)}
      className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left active:bg-gray-50 transition-colors min-h-[72px] flex items-center gap-3"
    >
      <Avatar name={student.name} photo={student.photo} size="md" variant="student" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-base truncate">{student.name}</p>
        <p className="text-sm text-gray-500 mt-0.5">{student.group || 'Geen groep'}</p>
      </div>
      <div className="ml-2 text-right shrink-0">
        {lastResult ? (
          <>
            <p className="text-sm font-semibold text-gray-700">{lastResult.aviLevel}</p>
            <div className="mt-1">
              <ClassificationBadge classification={lastResult.classification} size="sm" />
            </div>
            <p className="text-xs text-gray-400 mt-1">{formatDate(lastResult.date)}</p>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">Geen toetsen</p>
        )}
      </div>
    </button>
  );
}

export function HomePage({ students, results, teachers }: HomePageProps) {
  const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name, 'nl'));

  const useGrouped = teachers.length > 0;

  const teacherGroups = useGrouped
    ? teachers
        .map(teacher => ({
          teacher,
          students: sortedStudents.filter(s => s.primaryTeacherId === teacher.id),
        }))
        .filter(g => g.students.length > 0)
        .sort((a, b) => a.teacher.name.localeCompare(b.teacher.name, 'nl'))
    : [];

  const unassignedStudents = useGrouped
    ? sortedStudents.filter(s => !s.primaryTeacherId || !teachers.find(t => t.id === s.primaryTeacherId))
    : sortedStudents;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md">
        <h1 className="text-xl font-bold">AVI Leestoets</h1>
        <p className="text-blue-100 text-sm">{students.length} leerling{students.length !== 1 ? 'en' : ''}</p>
      </header>

      <div className="px-4 py-4">
        <button
          onClick={() => navigate('/student/new')}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[56px]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nieuwe leerling
        </button>
      </div>

      <div className="px-4">
        {students.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-lg font-medium text-gray-500">Nog geen leerlingen</p>
            <p className="text-sm mt-1">Voeg een leerling toe om te starten</p>
          </div>
        ) : useGrouped ? (
          <div className="space-y-6">
            {teacherGroups.map(({ teacher, students: ts }) => (
              <div key={teacher.id}>
                <button
                  onClick={() => navigate(`/teacher/${teacher.id}`)}
                  className="flex items-center gap-2 mb-2 active:opacity-70"
                >
                  <Avatar name={teacher.name} photo={teacher.photo} size="sm" variant="teacher" />
                  <span className="text-sm font-semibold text-gray-600">{teacher.name}</span>
                  <span className="text-xs text-gray-400">({ts.length})</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="space-y-2">
                  {ts.map(s => <StudentCard key={s.id} student={s} results={results} />)}
                </div>
              </div>
            ))}
            {unassignedStudents.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2">
                  Niet toegewezen ({unassignedStudents.length})
                </p>
                <div className="space-y-2">
                  {unassignedStudents.map(s => <StudentCard key={s.id} student={s} results={results} />)}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 font-medium">
              {students.length} leerling{students.length !== 1 ? 'en' : ''}
            </p>
            {sortedStudents.map(s => <StudentCard key={s.id} student={s} results={results} />)}
          </div>
        )}
      </div>

      <BottomNav activeTab="students" />
    </div>
  );
}
