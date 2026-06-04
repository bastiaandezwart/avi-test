import { useState } from 'react';
import { Student, Teacher } from '../types';
import { navigate } from '../hooks/useRouter';
import { PhotoPicker } from '../components/PhotoPicker';

interface StudentFormPageProps {
  student?: Student;
  teachers: Teacher[];
  onSave: (student: Student) => void;
}

const GROUPS = ['Groep 3', 'Groep 4', 'Groep 5', 'Groep 6', 'Groep 7', 'Groep 8'];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function StudentFormPage({ student, teachers, onSave }: StudentFormPageProps) {
  const [name, setName] = useState(student?.name ?? '');
  const [group, setGroup] = useState(student?.group ?? '');
  const [birthDate, setBirthDate] = useState(student?.birthDate ?? '');
  const [photo, setPhoto] = useState<string | undefined>(student?.photo);
  const [primaryTeacherId, setPrimaryTeacherId] = useState<string>(student?.primaryTeacherId ?? '');
  const [additionalTeacherIds, setAdditionalTeacherIds] = useState<string[]>(student?.additionalTeacherIds ?? []);
  const [nameError, setNameError] = useState('');

  const isEdit = !!student;

  const toggleAdditional = (id: string) => {
    setAdditionalTeacherIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Naam is verplicht');
      return;
    }
    const cleanedAdditional = additionalTeacherIds.filter(id => id !== primaryTeacherId);
    const saved: Student = {
      id: student?.id ?? generateId(),
      name: name.trim(),
      group: group || undefined,
      birthDate: birthDate || undefined,
      photo: photo || undefined,
      primaryTeacherId: primaryTeacherId || undefined,
      additionalTeacherIds: cleanedAdditional.length > 0 ? cleanedAdditional : undefined,
      createdAt: student?.createdAt ?? new Date().toISOString(),
    };
    onSave(saved);
    navigate(isEdit ? `/student/${saved.id}` : '/');
  };

  const availableAdditional = teachers.filter(t => t.id !== primaryTeacherId);

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
        <h1 className="text-xl font-bold">{isEdit ? 'Leerling bewerken' : 'Nieuwe leerling'}</h1>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-5">
        <PhotoPicker name={name} photo={photo} variant="student" onChange={setPhoto} />

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Naam <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setNameError(''); }}
            placeholder="Voornaam achternaam"
            className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px] ${
              nameError ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            autoFocus={!isEdit}
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
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
            {GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
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

        <div>
          <label htmlFor="primaryTeacher" className="block text-sm font-semibold text-gray-700 mb-1.5">
            Verantwoordelijke leraar
          </label>
          {teachers.length === 0 ? (
            <p className="text-sm text-gray-400 italic py-1">
              Nog geen leraren aangemaakt.{' '}
              <button
                type="button"
                onClick={() => navigate('/teacher/new')}
                className="text-blue-500 underline"
              >
                Leraar toevoegen
              </button>
            </p>
          ) : (
            <select
              id="primaryTeacher"
              value={primaryTeacherId}
              onChange={e => {
                setPrimaryTeacherId(e.target.value);
                setAdditionalTeacherIds(prev => prev.filter(id => id !== e.target.value));
              }}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[48px]"
            >
              <option value="">Geen verantwoordelijke leraar</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          )}
        </div>

        {availableAdditional.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Aanvullende leraren (optioneel)
            </label>
            <div className="space-y-2">
              {availableAdditional.map(t => (
                <label
                  key={t.id}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer active:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={additionalTeacherIds.includes(t.id)}
                    onChange={() => toggleAdditional(t.id)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className="text-gray-800 text-base">{t.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

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
            className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl text-lg active:bg-gray-100 transition-colors min-h-[56px]"
          >
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}
