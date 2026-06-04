import { Student, TestResult, AviLevel } from '../types';
import { AVI_LEVELS, AVI_LEVEL_ORDER, getNextLevel } from '../data/avi';
import { navigate } from '../hooks/useRouter';

interface TestLevelSelectPageProps {
  student: Student;
  results: TestResult[];
}

export function TestLevelSelectPage({ student, results }: TestLevelSelectPageProps) {
  const studentResults = results
    .filter(r => r.studentId === student.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastResult = studentResults[0];

  // Suggest next level based on last result
  const getSuggestedLevel = (): AviLevel | null => {
    if (!lastResult) return 'M3';
    if (lastResult.classification === 'goed') {
      return getNextLevel(lastResult.aviLevel) ?? lastResult.aviLevel;
    }
    if (lastResult.classification === 'voldoende') {
      return lastResult.aviLevel;
    }
    // onvoldoende - suggest same level again
    return lastResult.aviLevel;
  };

  const suggested = getSuggestedLevel();

  const classificationColors: Record<string, string> = {
    goed: 'bg-green-100 text-green-700 border-green-200',
    voldoende: 'bg-amber-100 text-amber-700 border-amber-200',
    onvoldoende: 'bg-red-100 text-red-700 border-red-200',
  };

  // Get last result per level
  const lastResultByLevel = AVI_LEVEL_ORDER.reduce<Record<AviLevel, TestResult | undefined>>((acc, level) => {
    acc[level] = studentResults.find(r => r.aviLevel === level);
    return acc;
  }, {} as Record<AviLevel, TestResult | undefined>);

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex items-center gap-3">
        <button
          onClick={() => navigate(`/student/${student.id}`)}
          className="p-1 -ml-1 rounded-lg active:bg-blue-500"
          aria-label="Terug"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">Niveau kiezen</h1>
          <p className="text-blue-100 text-sm">{student.name}</p>
        </div>
      </header>

      <div className="px-4 py-4">
        {suggested && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-800 text-sm">
              <strong>Aanbevolen niveau: {suggested}</strong>
              {lastResult && (
                <span className="text-blue-600">
                  {' '}— gebaseerd op laatste toets ({lastResult.aviLevel}, {lastResult.classification})
                </span>
              )}
              {!lastResult && <span className="text-blue-600"> — begin niveau voor nieuwe leerling</span>}
            </p>
          </div>
        )}

        <p className="text-sm text-gray-500 font-medium mb-3">Kies een niveau om te toetsen:</p>

        <div className="grid grid-cols-2 gap-3">
          {AVI_LEVELS.map(config => {
            const lastForLevel = lastResultByLevel[config.level];
            const isSuggested = config.level === suggested;

            return (
              <button
                key={config.level}
                onClick={() => navigate(`/student/${student.id}/test/${config.level}`)}
                className={`relative bg-white rounded-xl border-2 p-4 text-left active:scale-95 transition-all shadow-sm min-h-[80px] ${
                  isSuggested
                    ? 'border-blue-400 ring-2 ring-blue-200'
                    : 'border-gray-200'
                }`}
              >
                {isSuggested && (
                  <span className="absolute -top-2 left-3 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                    Aanbevolen
                  </span>
                )}
                <p className="font-bold text-2xl text-gray-900">{config.level}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{config.schoolYear}</p>
                {lastForLevel && (
                  <div className={`mt-2 text-xs px-1.5 py-0.5 rounded border inline-block ${classificationColors[lastForLevel.classification]}`}>
                    {lastForLevel.classification}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
