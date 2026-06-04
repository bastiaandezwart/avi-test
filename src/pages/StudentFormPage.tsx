import { useState, useRef } from 'react';
import { Student } from '../types';
import { navigate } from '../hooks/useRouter';

interface StudentFormPageProps {
  student?: Student;
  onSave: (student: Student) => void;
}

const GROUPS = ['Groep 3', 'Groep 4', 'Groep 5', 'Groep 6', 'Groep 7', 'Groep 8'];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function resizeImage(file: File, maxSize = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function StudentFormPage({ student, onSave }: StudentFormPageProps) {
  const [name, setName] = useState(student?.name ?? '');
  const [group, setGroup] = useState(student?.group ?? '');
  const [birthDate, setBirthDate] = useState(student?.birthDate ?? '');
  const [photo, setPhoto] = useState<string | undefined>(student?.photo);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = !!student;

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resized = await resizeImage(file);
      setPhoto(resized);
    } catch {
      // silently ignore resize errors
    }
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const saved: Student = {
      id: student?.id ?? generateId(),
      name: name.trim(),
      group: group || undefined,
      birthDate: birthDate || undefined,
      photo: photo || undefined,
      createdAt: student?.createdAt ?? new Date().toISOString(),
    };
    onSave(saved);
    navigate(isEdit ? `/student/${saved.id}` : '/');
  };

  const initials = name.trim()
    ? name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex items-center gap-3">
        <button
          onClick={() => navigate(isEdit ? `/student/${student.id}` : '/')}
          className="p-1 -ml-1 rounded-lg active:bg-blue-500"
          aria-label="Terug"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold">{isEdit ? 'Leerling bewerken' : 'Nieuwe leerling'}</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">
        {/* Photo picker */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative w-24 h-24 rounded-full overflow-hidden focus:outline-none active:opacity-80 transition-opacity"
            aria-label="Foto kiezen"
          >
            {photo ? (
              <img src={photo} alt="Profielfoto" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-500">{initials}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-2">
              <svg className="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </button>
          <span className="text-xs text-gray-500">Tik om foto te kiezen</span>
          {photo && (
            <button
              type="button"
              onClick={() => setPhoto(undefined)}
              className="text-xs text-red-500 active:text-red-700"
            >
              Foto verwijderen
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Naam <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setErrors({}); }}
            placeholder="Voornaam achternaam"
            className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            autoFocus={!isEdit}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="group" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Groep
          </label>
          <select
            id="group"
            value={group}
            onChange={e => setGroup(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
          >
            <option value="">Selecteer een groep</option>
            {GROUPS.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Geboortedatum (optioneel)
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
          />
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-sm transition-colors min-h-[56px]"
          >
            {isEdit ? 'Wijzigingen opslaan' : 'Leerling toevoegen'}
          </button>
          <button
            type="button"
            onClick={() => navigate(isEdit ? `/student/${student.id}` : '/')}
            className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl text-lg border border-gray-300 transition-colors min-h-[56px]"
          >
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}
