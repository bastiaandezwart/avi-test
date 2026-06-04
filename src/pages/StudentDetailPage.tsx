import { useState } from 'react';
import { Student, TestResult } from '../types';
import { navigate } from '../hooks/useRouter';
import { ClassificationBadge } from '../components/ClassificationBadge';

interface StudentDetailPageProps {
  student: Student;
  results: TestResult[];
  onDeleteStudent: (id: string) => void;
  onDeleteResult: (id: string) => void;
}

function formatSeconds(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function calcReadingSpeed(wordCount: number, seconds: number): number {
  if (seconds <= 0) return 0;
  return Math.round((wordCount / seconds) * 60);
}

function exportCSV(student: Student, results: TestResult[]) {
  const header = 'Datum,AVI-niveau,Fouten,Tijd (sec),Leessnelheid (w/min),Beoordeling,Notities';
  const rows = results
    .filter(r => r.studentId === student.id)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(r => {
      const speed = calcReadingSpeed(100, r.readingTimeSeconds);
      const date = new Date(r.date).toLocaleDateString('nl-NL');
      const notes = r.notes ? `"${r.notes.replace(/"/g, '""')}"` : '';
      return `${date},${r.aviLevel},${r.errors},${r.readingTimeSeconds},${speed},${r.classification},${notes}`;
    });
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AVI_${student.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function StudentAvatar({ student, size = 'md' }: { student: Student; size?: 'sm' | 'md' | 'lg' }) {
  const initials = student.name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClass = size === 'sm' ? 'w-9 h-9 text-sm' : size === 'lg' ? 'w-16 h-16 text-2xl' : 'w-11 h-11 text-base';

  if (student.photo) {
    return (
      <img
        src={student.photo}
        alt={student.name}
        className={`${sizeClass} rounded-full object-cover shrink-0`}
      />
    );
  }
  return (
    <div className={`${sizeClass} rounded-full bg-blue-200 flex items-center justify-center shrink-0`}>
      <span className="font-bold text-blue-700">{initials}</span>
    </div>
  );
}

export function StudentDetailPage({ student, results, onDeleteStudent, onDeleteResult }: StudentDetailPageProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmDeleteResultId, setConfirmDeleteResultId] = useState<string | null>(null);

  const studentResults = results
    .filter(r => r.studentId === student.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = () => {
    onDeleteStudent(student.id);
    navigate('/');
  };

  const handleDeleteResult = (id: string) => {
    onDeleteResult(id);
    setConfirmDeleteResultId(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="p-1 -ml-1 rounded-lg active:bg-blue-500"
          aria-label="Terug"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <StudentAvatar student={student} size="md" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold truncate">{student.name}</h1>
          {student.group && <p className="text-blue-100 text-sm">{student.group}</p>}
        </div>
        <button
          onClick={() => navigate(`/student/${student.id}/edit`)}
          className="p-2 rounded-lg active:bg-blue-500"
          aria-label="Bewerken"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Student info card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {student.birthDate && (
              <div>
                <p className="text-gray-500">Geboortedatum</p>
                <p className="font-medium text-gray-800">
                  {new Date(student.birthDate).toLocaleDateString('nl-NL')}
                </p>
              </div>
            )}
            <div>
              <p className="text-gray-500">Toetsen gedaan</p>
              <p className="font-medium text-gray-800">{studentResults.length}</p>
            </div>
            {studentResults.length > 0 && (
              <div>
                <p className="text-gray-500">Laatste niveau</p>
                <p className="font-semibold text-gray-800">{studentResults[0].aviLevel}</p>
              </div>
            )}
          </div>
        </div>

        {/* Start test button */}
        <button
          onClick={() => navigate(`/student/${student.id}/test`)}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-5 px-6 rounded-xl text-xl shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[64px]"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Nieuwe test starten
        </button>

        {/* Test history */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-800">Toetshistorie</h2>
            {studentResults.length > 0 && (
              <button
                onClick={() => exportCSV(student, results)}
                className="flex items-center gap-1.5 text-blue-600 text-sm font-medium active:text-blue-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exporteer CSV
              </button>
            )}
          </div>

          {studentResults.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-gray-400">
              <p>Nog geen toetsen gedaan</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Datum</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Niveau</th>
                      <th className="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Fouten</th>
                      <th className="px-3 py-2.5 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Tijd</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
                      <th className="px-2 py-2.5 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {studentResults.map(result =>
                      confirmDeleteResultId === result.id ? (
                        <tr key={result.id} className="bg-red-50">
                          <td colSpan={6} className="px-3 py-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-red-700 text-sm font-medium">Score verwijderen?</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setConfirmDeleteResultId(null)}
                                  className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-700 active:bg-gray-100 min-h-[36px]"
                                >
                                  Annuleren
                                </button>
                                <button
                                  onClick={() => handleDeleteResult(result.id)}
                                  className="text-xs px-3 py-1.5 bg-red-600 text-white rounded-lg active:bg-red-700 font-semibold min-h-[36px]"
                                >
                                  Verwijderen
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="px-3 py-3 text-gray-600 whitespace-nowrap">{formatDate(result.date)}</td>
                          <td className="px-3 py-3 font-semibold text-gray-800">{result.aviLevel}</td>
                          <td className="px-3 py-3 text-center text-gray-700">{result.errors}</td>
                          <td className="px-3 py-3 text-center text-gray-700 whitespace-nowrap">{formatSeconds(result.readingTimeSeconds)}</td>
                          <td className="px-3 py-3">
                            <ClassificationBadge classification={result.classification} size="sm" />
                          </td>
                          <td className="px-2 py-3 text-right">
                            <button
                              onClick={() => setConfirmDeleteResultId(result.id)}
                              className="p-1.5 text-gray-300 hover:text-red-500 active:text-red-700 rounded-lg transition-colors"
                              aria-label="Score verwijderen"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Delete student button */}
        <div className="pt-4">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full border border-red-300 text-red-600 font-medium py-3 px-6 rounded-xl text-base active:bg-red-50 transition-colors min-h-[48px]"
            >
              Leerling verwijderen
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
              <p className="text-red-800 font-medium text-center">
                Weet je zeker dat je <strong>{student.name}</strong> en alle toetsresultaten wilt verwijderen?
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
