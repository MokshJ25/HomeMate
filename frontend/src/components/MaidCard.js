// frontend/src/components/MaidCard.js
import React from 'react';

export default function MaidCard({ maid, onAssign }) {
  return (
    <div className="p-4 rounded shadow flex items-center">
      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
        {/* placeholder for image */}
        <span className="text-sm">{maid.name[0]}</span>
      </div>
      <div className="flex-1">
        <div className="font-semibold">{maid.name}</div>
        <div className="text-sm text-gray-600">Skills: {maid.skills.join(', ')}</div>
        <div className="text-sm text-gray-500">Phone: {maid.phone}</div>
      </div>
      <div>
        <button onClick={()=>onAssign(maid)} className="px-3 py-1 rounded bg-indigo-600 text-white">Assign</button>
      </div>
    </div>
  );
}
