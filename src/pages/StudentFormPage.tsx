import { useState } from 'react';
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

export function StudentFormPage({ student, onSave }: StudentFormPageProps) {
  const [name, setName] = useState(student?.name ?? '');
  const [group, setGroup] = useState(student?.group ?? '');
  const [birthDate, setBirthDate] = useState(student?.birthDate ?? '');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const isEdit = !!student;

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
      createdAt: student?.createdAt ?? new Date().toISOString(),
    };
    onSave(saved);
    navigate(isEdit ? `/student/${saved.id}` : '/');
  };

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
