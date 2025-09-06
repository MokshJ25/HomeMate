import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CATEGORY_FIELDS = {
  cleaning: [
    { key:'rooms', label:'Number of rooms', type:'number', required:true },
    { key:'floorArea', label:'Floor area (sq ft)', type:'number' },
    { key:'services', label:'Services', type:'checkboxGroup', options:['Dusting','Mopping','Washing Dishes','Washing Clothes'] }
  ],
  cooking: [
    { key:'vegNonVeg', label:'Veg or Non-Veg', type:'select', options:['Veg','Non-Veg','Both'] },
    { key:'members', label:'Number of members', type:'number', required:true },
  ],
  babysitting: [
    { key:'babyAge', label:'Age of baby (years)', type:'number', required:true },
    { key:'health', label:'Health issues / Instructions', type:'textarea' }
  ],
  elderlyCare: [
    { key:'elderName', label:'Name of elder', type:'text' },
    { key:'elderAge', label:'Age', type:'number' },
    { key:'diseases', label:'Diseases / Meds', type:'textarea' }
  ],
  other: [
    { key:'description', label:'Describe required work', type:'textarea' }
  ]
}

export default function BookingForm(){
  const [category, setCategory] = useState('cleaning');
  const [form, setForm] = useState({name:'', pincode:'', phone:'', email:'', durationType:'month', genderPref:'any'});
  const [dynamic, setDynamic] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // basic validation
    if(!form.name || !/^\d{6}$/.test(form.pincode) || !/^\d{10}$/.test(form.phone)) return alert('Please fill required fields correctly');
    // build schedule for package (simple: recurring daily/week/month -> example)
    // For simplicity, create schedule for next 30 days for "month" or single days for day
    let schedule = [];
    if(form.durationType === 'day') {
      const today = new Date().toISOString().slice(0,10);
      schedule = [today];
    } else {
      // create daily occurrences for next 30 (example logic; you can refine)
      for(let i=0;i<30;i++){
        const d = new Date();
        d.setDate(d.getDate() + i);
        schedule.push(d.toISOString().slice(0,10));
      }
    }

    try {
      const token = localStorage.getItem('token');
      const payload = {
        category,
        details: dynamic,
        address: form.address || '',
        pincode: form.pincode,
        phone: form.phone,
        email: form.email,
        durationType: form.durationType,
        packageName: form.packageName || '',
        schedule
      };
      const res = await axios.post(`${process.env.REACT_APP_API_BASE}/bookings`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Booking created! Admin will approve soon.');
      navigate('/updates');
    } catch (err) {
      console.error(err);
      alert('Error creating booking');
    }
  };

  const renderDynamic = () => {
    const fields = CATEGORY_FIELDS[category] || [];
    return fields.map(f => {
      if(f.type === 'checkboxGroup') {
        return (
          <div key={f.key} className="mb-2">
            <div className="font-medium">{f.label}</div>
            {f.options.map(opt => (
              <label key={opt} className="inline-flex items-center mr-3">
                <input type="checkbox" onChange={(e)=>{
                  const arr = dynamic[f.key] || [];
                  if(e.target.checked) setDynamic({...dynamic, [f.key]: [...arr, opt]});
                  else setDynamic({...dynamic, [f.key]: arr.filter(x=>x!==opt)});
                }} />
                <span className="ml-2">{opt}</span>
              </label>
            ))}
          </div>
        );
      }
      if(f.type === 'select') {
        return (
          <div key={f.key} className="mb-2">
            <label className="block">{f.label}</label>
            <select onChange={(e)=>setDynamic({...dynamic, [f.key]: e.target.value})} className="p-2 rounded border">
              <option value="">Select</option>
              {f.options.map(o=> <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        );
      }
      return (
        <div key={f.key} className="mb-2">
          <label>{f.label}</label>
          <input onChange={(e)=>setDynamic({...dynamic, [f.key]: e.target.value})}
                 className="w-full p-2 rounded border" />
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Book a maid</h2>

      <div className="mb-4">
        <label>Category</label>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="p-2 rounded border w-full">
          <option value="cleaning">Cleaning</option>
          <option value="cooking">Cooking</option>
          <option value="babysitting">Babysitting</option>
          <option value="elderlyCare">Elderly care</option>
          <option value="other">Other</option>
        </select>
      </div>

      {renderDynamic()}

      <div className="grid grid-cols-1 gap-3">
        <input placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
          className="p-2 rounded border" />
        <input placeholder="Pincode" value={form.pincode} onChange={e=>setForm({...form, pincode:e.target.value})}
          className="p-2 rounded border" />
        <input placeholder="Phone (10 digits)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
          className="p-2 rounded border" />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
          className="p-2 rounded border" />
        <select value={form.durationType} onChange={e=>setForm({...form, durationType:e.target.value})} className="p-2 rounded border">
          <option value="day">One day</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="quarter">Quarter</option>
          <option value="halfYear">Half year</option>
          <option value="year">Full year</option>
        </select>

        <label className="block">
          Preferred gender
          <select value={form.genderPref} onChange={e=>setForm({...form, genderPref:e.target.value})} className="p-2 rounded border w-full">
            <option value="any">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>
      </div>

      <div className="mt-4">
        <button onClick={handleSubmit} className="px-6 py-2 bg-indigo-600 text-white rounded">Submit Booking</button>
      </div>
    </div>
  );
}
