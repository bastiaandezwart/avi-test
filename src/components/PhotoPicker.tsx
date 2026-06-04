import { useRef } from 'react';
import { Avatar } from './Avatar';
import { resizeImage } from '../utils/image';

interface PhotoPickerProps {
  name: string;
  photo: string | undefined;
  variant?: 'student' | 'teacher';
  onChange: (photo: string | undefined) => void;
}

export function PhotoPicker({ name, photo, variant = 'student', onChange }: PhotoPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resized = await resizeImage(file);
      onChange(resized);
    } catch {
      // ignore resize errors
    }
    e.target.value = '';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="relative w-24 h-24 rounded-full overflow-hidden focus:outline-none active:opacity-80 transition-opacity"
        aria-label="Foto kiezen"
      >
        <Avatar name={name || '?'} photo={photo} size="xl" variant={variant} />
        <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-2">
          <svg className="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </button>
      <span className="text-xs text-gray-500">Tik om foto te kiezen</span>
      {photo && (
        <button type="button" onClick={() => onChange(undefined)} className="text-xs text-red-500 active:text-red-700">
          Foto verwijderen
        </button>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
