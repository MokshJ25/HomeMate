// frontend/src/pages/Packages.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PACKAGES = [
  { id:'day', title: 'One Day', price: 200, desc: 'Single day service' },
  { id:'week', title: 'Week', price: 1000, desc: '7 days service' },
  { id:'month', title: 'Monthly', price: 3500, desc: 'Recurring monthly (discounted)' },
  { id:'quarter', title: 'Quarter', price: 12000, desc: '3 months package' },
  { id:'halfYear', title: '6 Months', price: 18000, desc: '6 months popular' },
  { id:'year', title: 'Yearly', price: 35000, desc: 'Best value' }
];

export default function Packages(){
  const nav = useNavigate();
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PACKAGES.map(p => (
          <div key={p.id} className="p-6 rounded-2xl shadow">
            <div className="text-lg font-bold">{p.title}</div>
            <div className="text-2xl my-2">₹{p.price}</div>
            <div className="mb-4 text-sm text-gray-600">{p.desc}</div>
            <div className="flex justify-between items-center">
              <button className="px-4 py-2 rounded bg-indigo-600 text-white" onClick={()=>nav(`/booking?package=${p.id}`)}>Choose</button>
              <div className="text-sm text-gray-500">Save up to 50% on yearly</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
