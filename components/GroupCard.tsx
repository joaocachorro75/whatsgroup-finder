
import React from 'react';
import { WhatsAppGroup } from '../types';

interface GroupCardProps {
  group: WhatsAppGroup;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const handleJoin = () => {
    window.open(group.inviteLink, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
          {group.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
          {group.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{group.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{group.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {group.tags.slice(0, 3).map((tag, idx) => (
          <span key={idx} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <span className="text-xs text-gray-400">
          👥 {group.memberCount || 'Diversos'} membros
        </span>
        <button
          onClick={handleJoin}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <span>Participar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
