import { useState, useEffect, useRef, useCallback } from 'react';
import { Student, AviLevel, Classification } from '../types';
import { getAviConfig } from '../data/avi';
import { navigate } from '../hooks/useRouter';

interface TestScreenPageProps {
  student: Student;
  level: AviLevel;
  onSaveResult: (result: {
    studentId: string;
    aviLevel: AviLevel;
    errors: number;
    readingTimeSeconds: number;
    classification: Classification;
    notes?: string;
  }) => string;
}

function classify(errors: number, seconds: number, goodMaxErrors: number, goodMaxSeconds: number, sufficientMaxErrors: number, sufficientMaxSeconds: number): Classification {
  if (errors <= goodMaxErrors && seconds <= goodMaxSeconds) return 'beheersingsniveau';
  if (errors <= sufficientMaxErrors && seconds <= sufficientMaxSeconds) return 'instructieniveau';
  return 'frustratieniveau';
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function TestScreenPage({ student, level, onSaveResult }: TestScreenPageProps) {
  const config = getAviConfig(level);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [notes, setNotes] = useState('');
  const [started, setStarted] = useState(false);
  const [showText, setShowText] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerRunning(false);
  }, []);

  const startTimer = useCallback(() => {
    setStarted(true);
    setTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStop = () => {
    stopTimer();
    const classification = classify(
      errors,
      elapsed,
      config.goodMaxErrors,
      config.goodMaxSeconds,
      config.sufficientMaxErrors,
      config.sufficientMaxSeconds
    );
    const resultId = onSaveResult({
      studentId: student.id,
      aviLevel: level,
      errors,
      readingTimeSeconds: elapsed,
      classification,
      notes: notes.trim() || undefined,
    });
    navigate(`/test/result/${resultId}`);
  };

  const handleAddError = () => setErrors(prev => prev + 1);
  const handleRemoveError = () => setErrors(prev => Math.max(0, prev - 1));

  const timerColorClass = elapsed > config.sufficientMaxSeconds
    ? 'text-red-600'
    : elapsed > config.goodMaxSeconds
    ? 'text-amber-500'
    : 'text-gray-900';

  return (
    <div className="min-h-screen bg-gray-50 pb-6 flex flex-col">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex items-center gap-3">
        <button
          onClick={() => {
            stopTimer();
            navigate(`/student/${student.id}/test`);
          }}
          className="p-1 -ml-1 rounded-lg active:bg-blue-500"
          aria-label="Terug"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">AVI {level} toets</h1>
          <p className="text-blue-100 text-sm">{student.name} · {config.schoolYear}</p>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Timer section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <p className="text-sm text-gray-500 font-medium mb-1">Leestijd</p>
          <div className={`text-7xl font-black tabular-nums leading-none ${timerColorClass}`}>
            {formatTime(elapsed)}
          </div>
          <div className="mt-2 flex gap-2 justify-center text-xs text-gray-400">
            <span>Beheerst: ≤{formatTime(config.goodMaxSeconds)}</span>
            <span>·</span>
            <span>Instructie: ≤{formatTime(config.sufficientMaxSeconds)}</span>
          </div>

          {!started ? (
            <button
              onClick={startTimer}
              className="mt-5 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-5 px-6 rounded-xl text-2xl shadow-md transition-colors min-h-[72px]"
            >
              ▶ START
            </button>
          ) : timerRunning ? (
            <button
              onClick={() => { stopTimer(); }}
              className="mt-5 w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl text-xl shadow transition-colors min-h-[64px]"
            >
              ⏸ Pauzeer
            </button>
          ) : (
            <div className="mt-5 flex gap-3">
              <button
                onClick={startTimer}
                className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl text-lg shadow transition-colors min-h-[56px]"
              >
                ▶ Hervat
              </button>
            </div>
          )}
        </div>

        {/* Error counter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-sm text-gray-500 font-medium text-center mb-3">Aantal fouten</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleRemoveError}
              disabled={errors === 0}
              className="w-16 h-16 rounded-full bg-red-100 text-red-700 font-black text-3xl active:bg-red-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              aria-label="Fout verwijderen"
            >
              −
            </button>
            <div className="text-6xl font-black text-gray-900 min-w-[80px] text-center tabular-nums">
              {errors}
            </div>
            <button
              onClick={handleAddError}
              className="w-16 h-16 rounded-full bg-green-100 text-green-700 font-black text-3xl active:bg-green-200 transition-colors flex items-center justify-center"
              aria-label="Fout toevoegen"
            >
              +
            </button>
          </div>
          <div className="mt-3 flex gap-3 justify-center text-xs text-gray-400">
            <span>Beheerst: ≤{config.goodMaxErrors} fouten</span>
            <span>·</span>
            <span>Instructie: ≤{config.sufficientMaxErrors} fouten</span>
          </div>
        </div>

        {/* Sample text toggle */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowText(!showText)}
            className="w-full px-5 py-4 text-left flex items-center justify-between active:bg-gray-50"
          >
            <div>
              <p className="font-semibold text-gray-800">Voorbeeldtekst ({config.wordCount} woorden)</p>
              <p className="text-xs text-gray-400 mt-0.5">Let op: gebruik officiële Cito-kaarten voor de toets</p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${showText ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showText && (
            <div className="px-5 pb-5 border-t border-gray-50">
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                <p className="text-xs text-yellow-800">
                  ⚠ Dit is een voorbeeldtekst ter referentie. Gebruik voor een officiële toets de originele Cito AVI-kaarten.
                </p>
              </div>
              <p className="text-base leading-relaxed text-gray-800 whitespace-pre-line">
                {config.sampleText}
              </p>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notities (optioneel)
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Opmerkingen over de toets..."
            rows={3}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Stop & assess button */}
        <button
          onClick={handleStop}
          disabled={!started}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-400 text-white font-bold py-5 px-6 rounded-xl text-xl shadow-md transition-colors min-h-[72px]"
        >
          Stop & Beoordeel
        </button>

        {!started && (
          <p className="text-center text-sm text-gray-400">Druk op START om de timer te starten</p>
        )}
      </div>
    </div>
  );
}
