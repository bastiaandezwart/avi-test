import { Classification } from '../types';

interface ClassificationBadgeProps {
  classification: Classification;
  size?: 'sm' | 'md' | 'lg';
}

const labels: Record<Classification, string> = {
  beheersingsniveau: 'Beheerst',
  instructieniveau: 'Instructie',
  frustratieniveau: 'Frustratie',
};

const colors: Record<Classification, string> = {
  beheersingsniveau: 'bg-green-100 text-green-800 border border-green-300',
  instructieniveau: 'bg-amber-100 text-amber-800 border border-amber-300',
  frustratieniveau: 'bg-red-100 text-red-800 border border-red-300',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5 rounded',
  md: 'text-sm px-3 py-1 rounded-md font-medium',
  lg: 'text-base px-4 py-2 rounded-lg font-semibold',
};

export function ClassificationBadge({ classification, size = 'md' }: ClassificationBadgeProps) {
  return (
    <span className={`inline-block ${colors[classification]} ${sizes[size]}`}>
      {labels[classification]}
    </span>
  );
}
