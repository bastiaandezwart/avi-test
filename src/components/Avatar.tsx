interface AvatarProps {
  name: string;
  photo?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'student' | 'teacher';
}

const sizeClasses = {
  sm: 'w-9 h-9 text-sm',
  md: 'w-11 h-11 text-base',
  lg: 'w-16 h-16 text-2xl',
  xl: 'w-24 h-24 text-3xl',
};

const variantClasses = {
  student: 'bg-blue-100 text-blue-700',
  teacher: 'bg-purple-100 text-purple-700',
};

export function Avatar({ name, photo, size = 'md', variant = 'student' }: AvatarProps) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || '?';
  const sz = sizeClasses[size];
  if (photo) {
    return <img src={photo} alt={name} className={`${sz} rounded-full object-cover shrink-0`} />;
  }
  return (
    <div className={`${sz} rounded-full ${variantClasses[variant]} flex items-center justify-center shrink-0`}>
      <span className="font-bold">{initials}</span>
    </div>
  );
}
