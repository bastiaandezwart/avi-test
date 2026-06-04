import { Teacher, Student } from '../types';
import { navigate } from '../hooks/useRouter';
import { Avatar } from '../components/Avatar';
import { BottomNav } from '../components/BottomNav';

interface TeachersPageProps {
  teachers: Teacher[];
  students: Student[];
}

export function TeachersPage({ teachers, students }: TeachersPageProps) {
  const getStudentCount = (teacherId: string) =>
    students.filter(s => s.primaryTeacherId === teacherId || s.additionalTeacherIds?.includes(teacherId)).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md">
        <h1 className="text-xl font-bold">Leraren</h1>
        <p className="text-blue-100 text-sm">{teachers.length} leraar{teachers.length !== 1 ? 'en' : ''}</p>
      </header>

      <div className="px-4 py-4">
        <button
          onClick={() => navigate('/teacher/new')}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[56px]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nieuwe leraar
        </button>
      </div>

      <div className="px-4">
        {teachers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-lg font-medium text-gray-500">Nog geen leraren</p>
            <p className="text-sm mt-1">Voeg een leraar toe om te starten</p>
          </div>
        ) : (
          <div className="space-y-3">
            {teachers
              .sort((a, b) => a.name.localeCompare(b.name, 'nl'))
              .map(teacher => {
                const count = getStudentCount(teacher.id);
                return (
                  <button
                    key={teacher.id}
                    onClick={() => navigate(`/teacher/${teacher.id}`)}
                    className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left active:bg-gray-50 transition-colors min-h-[72px] flex items-center gap-3"
                  >
                    <Avatar name={teacher.name} photo={teacher.photo} size="md" variant="teacher" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base truncate">{teacher.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {count} leerling{count !== 1 ? 'en' : ''}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
          </div>
        )}
      </div>

      <BottomNav activeTab="teachers" />
    </div>
  );
}
