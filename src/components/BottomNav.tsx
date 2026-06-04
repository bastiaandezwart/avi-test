import { navigate } from '../hooks/useRouter';

interface BottomNavProps {
  activeTab: 'students' | 'new-test';
}

export function BottomNav({ activeTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-10">
      <button
        onClick={() => navigate('/')}
        className={`flex-1 flex flex-col items-center justify-center py-3 min-h-[56px] text-sm font-medium transition-colors ${
          activeTab === 'students'
            ? 'text-blue-600 border-t-2 border-blue-600'
            : 'text-gray-500'
        }`}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Leerlingen
      </button>
      <button
        onClick={() => navigate('/student/new')}
        className={`flex-1 flex flex-col items-center justify-center py-3 min-h-[56px] text-sm font-medium transition-colors ${
          activeTab === 'new-test'
            ? 'text-blue-600 border-t-2 border-blue-600'
            : 'text-gray-500'
        }`}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Nieuwe leerling
      </button>
    </nav>
  );
}
