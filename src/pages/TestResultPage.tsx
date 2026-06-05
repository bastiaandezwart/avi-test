import { Student, TestResult } from '../types';
import { getAviConfig, getNextLevel } from '../data/avi';
import { navigate } from '../hooks/useRouter';

interface TestResultPageProps {
  result: TestResult;
  student: Student;
  onDeleteResult: (resultId: string) => void;
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

const classificationConfig = {
  beheersingsniveau: {
    label: 'BEHEERST',
    bgClass: 'bg-green-500',
    textClass: 'text-green-700',
    bgLightClass: 'bg-green-50',
    borderClass: 'border-green-300',
    emoji: '✓',
  },
  instructieniveau: {
    label: 'INSTRUCTIE',
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-700',
    bgLightClass: 'bg-amber-50',
    borderClass: 'border-amber-300',
    emoji: '~',
  },
  frustratieniveau: {
    label: 'FRUSTRATIE',
    bgClass: 'bg-red-500',
    textClass: 'text-red-700',
    bgLightClass: 'bg-red-50',
    borderClass: 'border-red-300',
    emoji: '✗',
  },
};

export function TestResultPage({ result, student, onDeleteResult }: TestResultPageProps) {
  const config = getAviConfig(result.aviLevel);
  const cc = classificationConfig[result.classification];
  const nextLevel = getNextLevel(result.aviLevel);
  const speed = calcReadingSpeed(config.wordCount, result.readingTimeSeconds);

  const handleRetry = () => {
    onDeleteResult(result.id);
    navigate(`/student/${student.id}/test/${result.aviLevel}`);
  };

  const handleSaveStop = () => {
    navigate(`/student/${student.id}`);
  };

  const handleSaveNext = () => {
    if (nextLevel) {
      navigate(`/student/${student.id}/test/${nextLevel}`);
    }
  };

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
          <h1 className="text-xl font-bold">Toetsresultaat</h1>
          <p className="text-blue-100 text-sm">{student.name}</p>
        </div>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Big classification display */}
        <div className={`${cc.bgLightClass} ${cc.borderClass} border-2 rounded-2xl p-6 text-center`}>
          <p className="text-sm font-medium text-gray-500 mb-1">AVI niveau {result.aviLevel}</p>
          <div className={`text-5xl font-black ${cc.textClass} leading-none`}>
            {cc.label}
          </div>
          <p className="text-gray-500 text-sm mt-2">{config.schoolYear}</p>
        </div>

        {/* Score details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Resultaten</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-black text-gray-900">{result.errors}</p>
              <p className="text-xs text-gray-500 mt-1">Fouten</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">{formatSeconds(result.readingTimeSeconds)}</p>
              <p className="text-xs text-gray-500 mt-1">Tijd</p>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900">{speed}</p>
              <p className="text-xs text-gray-500 mt-1">w/min</p>
            </div>
          </div>
        </div>

        {/* Scoring breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Normering ({result.aviLevel})</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="font-medium text-green-700">Beheersingsniveau</span>
              <span className="text-gray-600">≤{config.goodMaxErrors} fouten én ≤{formatSeconds(config.goodMaxSeconds)} min.</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="font-medium text-amber-700">Instructieniveau</span>
              <span className="text-gray-600">≤{config.sufficientMaxErrors} fouten én ≤{formatSeconds(config.sufficientMaxSeconds)} min.</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-medium text-red-700">Frustratieniveau</span>
              <span className="text-gray-600">Buiten de normen</span>
            </div>
          </div>

          {/* Visual indicators */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Fouten:</span>
              <span className={`font-semibold ${
                result.errors <= config.goodMaxErrors ? 'text-green-700' :
                result.errors <= config.sufficientMaxErrors ? 'text-amber-700' :
                'text-red-700'
              }`}>
                {result.errors}
                {result.errors <= config.goodMaxErrors ? ' ✓ (beheerst)' :
                  result.errors <= config.sufficientMaxErrors ? ' ~ (instructie)' :
                  ' ✗ (te veel)'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Tijd:</span>
              <span className={`font-semibold ${
                result.readingTimeSeconds <= config.goodMaxSeconds ? 'text-green-700' :
                result.readingTimeSeconds <= config.sufficientMaxSeconds ? 'text-amber-700' :
                'text-red-700'
              }`}>
                {formatSeconds(result.readingTimeSeconds)}
                {result.readingTimeSeconds <= config.goodMaxSeconds ? ' ✓ (beheerst)' :
                  result.readingTimeSeconds <= config.sufficientMaxSeconds ? ' ~ (instructie)' :
                  ' ✗ (te lang)'}
              </span>
            </div>
          </div>
        </div>

        {result.observations && Object.values(result.observations).some(Boolean) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Leesgedrag</h2>
            <div className="flex flex-wrap gap-2">
              {result.observations.spellingReading && <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-200">Spellend lezen</span>}
              {result.observations.skippedWords && <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-200">Woord overgeslagen</span>}
              {result.observations.mispronunciation && <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-200">Verklanking</span>}
              {result.observations.selfCorrections && <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-200">Zelfcorrectie</span>}
            </div>
          </div>
        )}

        {result.notes && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Notities</h2>
            <p className="text-gray-700 text-sm">{result.notes}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          {nextLevel && (
            <button
              onClick={handleSaveNext}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-sm transition-colors min-h-[60px]"
            >
              Sla op & volgende niveau ({nextLevel})
            </button>
          )}
          <button
            onClick={handleSaveStop}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-sm transition-colors min-h-[60px]"
          >
            Sla op & stop
          </button>
          <button
            onClick={handleRetry}
            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl text-lg active:bg-gray-50 transition-colors min-h-[60px]"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    </div>
  );
}
