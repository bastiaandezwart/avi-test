import { useState } from 'react';
import { Teacher } from '../types';
import { navigate } from '../hooks/useRouter';
import { PhotoPicker } from '../components/PhotoPicker';

interface TeacherFormPageProps {
  teacher?: Teacher;
  onSave: (teacher: Teacher) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function TeacherFormPage({ teacher, onSave }: TeacherFormPageProps) {
  const [name, setName] = useState(teacher?.name ?? '');
  const [photo, setPhoto] = useState<string | undefined>(teacher?.photo);
  const [nameError, setNameError] = useState('');

  const isEdit = !!teacher;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Naam is verplicht');
      return;
    }
    const saved: Teacher = {
      id: teacher?.id ?? generateId(),
      name: name.trim(),
      photo: photo || undefined,
      createdAt: teacher?.createdAt ?? new Date().toISOString(),
    };
    onSave(saved);
    navigate(isEdit ? `/teacher/${saved.id}` : '/teachers');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white px-4 py-4 shadow-md flex items-center gap-3">
        <button
          onClick={() => navigate(isEdit ? `/teacher/${teacher.id}` : '/teachers')}
          className="p-1 -ml-1 rounded-lg active:bg-blue-500"
          aria-label="Terug"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">{isEdit ? 'Leraar bewerken' : 'Nieuwe leraar'}</h1>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">
        <PhotoPicker name={name} photo={photo} variant="teacher" onChange={setPhoto} />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Naam <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setNameError(''); }}
            placeholder="Voor- en achternaam"
            className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] ${
              nameError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            autoFocus={!isEdit}
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-sm transition-colors min-h-[56px]"
          >
            {isEdit ? 'Wijzigingen opslaan' : 'Leraar toevoegen'}
          </button>
          <button
            type="button"
            onClick={() => navigate(isEdit ? `/teacher/${teacher.id}` : '/teachers')}
            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl text-lg active:bg-gray-100 transition-colors min-h-[56px]"
          >
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}
