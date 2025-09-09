// frontend/src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import MaidCard from '../components/MaidCard';

export default function AdminDashboard(){
  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [maids, setMaids] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(()=> { load(); }, []);

  const load = async () => {
    const res = await api.get('/admin/bookings');
    setBookings(res.data);
  };

  const openAssign = async (booking) => {
    setSelected(booking);
    // fetch maids (filter by category skill)
    const skill = booking.category;
    const date = booking.schedule?.[0] || '';
    const res = await api.get(`/maids?skill=${skill}`);
    // basic availability filter on client-side
    const list = res.data.filter(m => !(m.leaveDates || []).includes(date) && !(m.bookedDates || []).includes(date));
    setMaids(list);
  };

  const assign = async (maid) => {
    if (!selected) return;
    try {
      const res = await api.put(`/admin/assign/${selected._id}`, { maidId: maid._id });
      alert('Assigned successfully');
      setSelected(null);
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || 'Could not assign');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Bookings</h3>
          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b._id} className="p-3 rounded shadow flex justify-between">
                <div>
                  <div className="font-semibold">{b.category} — {b.pincode}</div>
                  <div className="text-sm text-gray-600">Status: {b.status} • {b.schedule?.length || 0} days</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={()=>openAssign(b)} className="px-3 py-1 rounded bg-indigo-600 text-white">Assign Maid</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selected ? (
            <>
              <h3 className="font-medium">Assign maid for: {selected.category} — {selected.pincode}</h3>
              <div className="mt-3 space-y-3">
                {maids.length === 0 && <div className="text-sm text-gray-500">No available maids for the selected date/skill.</div>}
                {maids.map(m => <MaidCard key={m._id} maid={m} onAssign={assign} />)}
              </div>
              <div className="mt-4">
                <button onClick={()=>setSelected(null)} className="px-3 py-1 rounded border">Close</button>
              </div>
            </>
          ) : (
            <div className="text-gray-500">Click "Assign Maid" on any booking to pick a maid.</div>
          )}
        </div>
      </div>
    </div>
  );
}
