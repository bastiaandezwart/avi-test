import { TestResult, AviLevel, Classification } from '../types';
import { AVI_LEVEL_ORDER } from '../data/avi';

interface ProgressChartProps {
  results: TestResult[];
}

const DOT_COLORS: Record<Classification, string> = {
  beheersingsniveau: '#16a34a',
  instructieniveau: '#d97706',
  frustratieniveau: '#dc2626',
};

export function ProgressChart({ results }: ProgressChartProps) {
  const active = [...results]
    .filter(r => !r.deletedAt)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (active.length < 2) return null;

  const W = 320;
  const H = 160;
  const PAD = { top: 16, right: 12, bottom: 32, left: 44 };
  const cw = W - PAD.left - PAD.right;
  const ch = H - PAD.top - PAD.bottom;

  const levelIndex = (l: AviLevel) => AVI_LEVEL_ORDER.indexOf(l);
  const indices = active.map(r => levelIndex(r.aviLevel));
  const rawMin = Math.min(...indices);
  const rawMax = Math.max(...indices);
  const minIdx = Math.max(0, rawMin - 1);
  const maxIdx = Math.min(AVI_LEVEL_ORDER.length - 1, rawMax + 1);
  const yRange = maxIdx - minIdx || 1;

  const xOf = (i: number) => PAD.left + (i / Math.max(active.length - 1, 1)) * cw;
  const yOf = (level: AviLevel) =>
    PAD.top + ch - ((levelIndex(level) - minIdx) / yRange) * ch;

  const linePath = active
    .map((r, i) => `${i === 0 ? 'M' : 'L'} ${xOf(i).toFixed(1)} ${yOf(r.aviLevel).toFixed(1)}`)
    .join(' ');

  const yLevels = AVI_LEVEL_ORDER.slice(minIdx, maxIdx + 1);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <p className="text-sm font-semibold text-gray-700 mb-1">Voortgang</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Voortgangsgrafiek">
        {/* Grid lines + Y-axis labels */}
        {yLevels.map(level => {
          const yp = yOf(level);
          return (
            <g key={level}>
              <line x1={PAD.left} y1={yp} x2={W - PAD.right} y2={yp}
                stroke="#f3f4f6" strokeWidth={1} />
              <text x={PAD.left - 6} y={yp + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                {level}
              </text>
            </g>
          );
        })}

        {/* Connecting line */}
        <path d={linePath} fill="none" stroke="#bfdbfe" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

        {/* Data points */}
        {active.map((r, i) => (
          <circle key={r.id}
            cx={xOf(i)} cy={yOf(r.aviLevel)} r={5}
            fill={DOT_COLORS[r.classification]}
            stroke="white" strokeWidth={2} />
        ))}

        {/* X-axis labels */}
        {active.map((r, i) => (
          <text key={r.id}
            x={xOf(i)} y={H - 4}
            textAnchor="middle" fontSize={8} fill="#9ca3af">
            {formatDate(r.date)}
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex gap-3 mt-1 justify-end">
        {[
          { label: 'Beheerst', color: 'bg-green-600' },
          { label: 'Instructie', color: 'bg-amber-600' },
          { label: 'Frustratie', color: 'bg-red-600' },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1 text-xs text-gray-400">
            <span className={`w-2 h-2 rounded-full ${color} inline-block`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
