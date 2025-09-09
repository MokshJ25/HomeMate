// frontend/src/pages/CategorySelection.js
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'cleaning', title: 'Cleaning', desc: 'Dusting, Mopping, Dishes, Laundry' },
  { id: 'cooking', title: 'Cooking', desc: 'Home-cooked meals, veg/non-veg' },
  { id: 'babysitting', title: 'Babysitting', desc: 'Child care & nanny services' },
  { id: 'elderlyCare', title: 'Elderly Care', desc: 'Companionship & medical assistance' },
  { id: 'other', title: 'Other', desc: 'Gardening, pet-care, etc.' }
];

export default function CategorySelection(){
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Choose a category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map(c => (
          <Link key={c.id} to={`/booking?category=${c.id}`} className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-xl font-medium">{c.title}</div>
            <div className="text-sm mt-2 text-gray-600">{c.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
